package com.guruvani.widget

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.guruvani.specs.NativeSharedStorageSpec

@ReactModule(name = SharedStorageModule.NAME)
class SharedStorageModule(
        private val reactContext: ReactApplicationContext,
) : NativeSharedStorageSpec(reactContext) {

    override fun getName(): String = NAME

    override fun setItem(key: String, value: String, promise: Promise) {
        try {
            WidgetStore.setString(reactContext, key, value)
            if (key in REFRESH_KEYS) {
                JapWidgetProvider.refreshAll(reactContext)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("E_SET_ITEM", e)
        }
    }

    override fun getItem(key: String, promise: Promise) {
        try {
            promise.resolve(WidgetStore.getString(reactContext, key))
        } catch (e: Exception) {
            promise.reject("E_GET_ITEM", e)
        }
    }

    companion object {
        const val NAME = "SharedStorage"
        private val REFRESH_KEYS =
                setOf(
                        WidgetStore.KEY_COUNT,
                        WidgetStore.KEY_NAME,
                        WidgetStore.KEY_MANTRA_ID,
                )
    }
}
