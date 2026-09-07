package com.guruvani

import android.app.Activity
import android.content.Intent
import com.facebook.fbreact.specs.NativeImagePickerModuleSpec
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

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
            pickerPromise?.resolve(data.data.toString())
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
