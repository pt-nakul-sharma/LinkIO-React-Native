package io.linkio.reactnative

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.linkio.android.LinkIO
import io.linkio.android.LinkIOConfig

class LinkIOReactNativeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "LinkIO"
    }

    @ReactMethod
    fun configure(config: ReadableMap) {
        val domain = config.getString("domain") ?: return
        val backendURL = config.getString("backendURL") ?: return
        val autoCheck = config.getBoolean("autoCheckPendingLinks")

        val linkIOConfig = LinkIOConfig(
            domain = domain,
            backendURL = backendURL,
            autoCheckPendingLinks = autoCheck
        )

        LinkIO.init(reactApplicationContext, linkIOConfig)

        LinkIO.setDeepLinkListener { deepLink ->
            val params = Arguments.createMap().apply {
                putString("url", deepLink.url)
                putMap("params", deepLink.params.toWritableMap())
                putBoolean("isDeferred", deepLink.isDeferred)
            }
            sendEvent("onDeepLink", params)
        }
    }

    @ReactMethod
    fun trackReferral(
        referralCode: String,
        userId: String,
        metadata: ReadableMap,
        promise: Promise
    ) {
        LinkIO.trackReferral(
            referralCode = referralCode,
            userId = userId,
            metadata = metadata.toHashMap() as Map<String, String>
        )
        promise.resolve(null)
    }

    @ReactMethod
    fun checkPendingLink(promise: Promise) {
        LinkIO.checkPendingLink()
        promise.resolve(null)
    }

    @ReactMethod
    fun handleURL(url: String) {
        // Android handles this through intent filters automatically
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    private fun Map<String, String>.toWritableMap(): WritableMap {
        val map = Arguments.createMap()
        forEach { (key, value) ->
            map.putString(key, value)
        }
        return map
    }
}
