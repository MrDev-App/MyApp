package com.guruvani

import android.app.Activity
import android.content.Intent
import com.facebook.fbreact.specs.NativeImagePickerModuleSpec
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.io.File
import java.io.FileOutputStream

class ImagePickerModule(reactContext: ReactApplicationContext) :
        NativeImagePickerModuleSpec(reactContext), ActivityEventListener {

    private var pickerPromise: Promise? = null
    private val PICK_IMAGE_REQUEST_CODE = 9001

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = NAME

    // This signature MUST match exactly what the .ts spec declared
    override fun pickImage(promise: Promise) {
        val activity: Activity? = reactApplicationContext.currentActivity

        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Current activity is null")
            return
        }

        pickerPromise = promise

        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "image/*"
        activity.startActivityForResult(intent, PICK_IMAGE_REQUEST_CODE)
    }

    override fun onActivityResult(
            activity: Activity,
            requestCode: Int,
            resultCode: Int,
            data: Intent?
    ) {
        if (requestCode != PICK_IMAGE_REQUEST_CODE) return

        if (resultCode == Activity.RESULT_OK && data?.data != null) {
            val sourceUri = data.data!!
            try {
                // Delete previous avatar file to save disk space
                reactApplicationContext.filesDir
                        .listFiles { file -> file.name.startsWith("profile_avatar_") }
                        ?.forEach { it.delete() }

                // Copy selected image into app's private filesDir for permanent persistence
                val destFile =
                        File(
                                reactApplicationContext.filesDir,
                                "profile_avatar_${System.currentTimeMillis()}.jpg"
                        )
                val inputStream = reactApplicationContext.contentResolver.openInputStream(sourceUri)
                val outputStream = FileOutputStream(destFile)

                inputStream?.use { input -> outputStream.use { output -> input.copyTo(output) } }

                pickerPromise?.resolve("file://${destFile.absolutePath}")
            } catch (e: Exception) {
                pickerPromise?.resolve(sourceUri.toString())
            }
        } else {
            pickerPromise?.reject("CANCELLED", "User cancelled image selection")
        }
        pickerPromise = null
    }

    override fun onNewIntent(intent: Intent) {
        // required by ActivityEventListener, not needed here
    }

    companion object {
        const val NAME = "ImagePickerModule"
    }
}
