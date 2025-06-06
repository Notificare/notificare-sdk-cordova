package re.notifica.push.ui.cordova

import android.net.Uri
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaArgs
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject
import re.notifica.Notificare
import re.notifica.models.NotificareNotification
import re.notifica.push.ui.NotificarePushUI
import re.notifica.push.ui.ktx.pushUI

class NotificarePushUIPlugin : CordovaPlugin(), NotificarePushUI.NotificationLifecycleListener {

    override fun pluginInitialize() {
        logger.hasDebugLoggingEnabled = Notificare.options?.debugLoggingEnabled ?: false

        Notificare.pushUI().addLifecycleListener(this)
    }

    override fun execute(action: String, args: CordovaArgs, callback: CallbackContext): Boolean {
        when (action) {
            "presentNotification" -> presentNotification(args, callback)
            "presentAction" -> presentAction(args, callback)

            // Event broker
            "registerListener" -> registerListener(args, callback)

            else -> {
                callback.error("No implementation for action '$action'.")
                return false
            }
        }

        return true
    }

    // region Notificare Push UI

    private fun presentNotification(@Suppress("UNUSED_PARAMETER") args: CordovaArgs, callback: CallbackContext) {
        val notification: NotificareNotification = try {
            NotificareNotification.fromJson(args.getJSONObject(0))
        } catch (e: Exception) {
            callback.error(e.message)
            return
        }

        val activity = cordova.activity ?: run {
            callback.error("Cannot present a notification without an activity.")
            return
        }

        Notificare.pushUI().presentNotification(activity, notification)
        callback.void()
    }

    private fun presentAction(@Suppress("UNUSED_PARAMETER") args: CordovaArgs, callback: CallbackContext) {
        val notification: NotificareNotification
        val action: NotificareNotification.Action

        try {
            notification = NotificareNotification.fromJson(args.getJSONObject(0))
            action = NotificareNotification.Action.fromJson(args.getJSONObject(1))
        } catch (e: Exception) {
            callback.error(e.message)
            return
        }

        val activity = cordova.activity ?: run {
            callback.error("Cannot present a notification without an activity.")
            return
        }

        Notificare.pushUI().presentAction(activity, notification, action)
        callback.void()
    }

    // endregion

    // region NotificarePushUI.NotificationLifecycleListener

    override fun onNotificationWillPresent(notification: NotificareNotification) {
        try {
            NotificarePushUIPluginEventBroker.dispatchEvent("notification_will_present", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_will_present event.", e)
        }
    }

    override fun onNotificationPresented(notification: NotificareNotification) {
        try {
            NotificarePushUIPluginEventBroker.dispatchEvent("notification_presented", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_presented event.", e)
        }
    }

    override fun onNotificationFinishedPresenting(notification: NotificareNotification) {
        try {
            NotificarePushUIPluginEventBroker.dispatchEvent("notification_finished_presenting", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_finished_presenting event.", e)
        }
    }

    override fun onNotificationFailedToPresent(notification: NotificareNotification) {
        try {
            NotificarePushUIPluginEventBroker.dispatchEvent("notification_failed_to_present", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_failed_to_present event.", e)
        }
    }

    override fun onNotificationUrlClicked(notification: NotificareNotification, uri: Uri) {
        try {
            val json = JSONObject()
            json.put("notification", notification.toJson())
            json.put("url", uri.toString())

            NotificarePushUIPluginEventBroker.dispatchEvent("notification_url_clicked", json)
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_url_clicked event.", e)
        }
    }

    override fun onActionWillExecute(notification: NotificareNotification, action: NotificareNotification.Action) {
        try {
            val json = JSONObject()
            json.put("notification", notification.toJson())
            json.put("action", action.toJson())

            NotificarePushUIPluginEventBroker.dispatchEvent("action_will_execute", json)
        } catch (e: Exception) {
            logger.error("Failed to emit the action_will_execute event.", e)
        }
    }

    override fun onActionExecuted(notification: NotificareNotification, action: NotificareNotification.Action) {
        try {
            val json = JSONObject()
            json.put("notification", notification.toJson())
            json.put("action", action.toJson())

            NotificarePushUIPluginEventBroker.dispatchEvent("action_executed", json)
        } catch (e: Exception) {
            logger.error("Failed to emit the action_executed event.", e)
        }
    }

    override fun onActionFailedToExecute(
        notification: NotificareNotification,
        action: NotificareNotification.Action,
        error: Exception?
    ) {
        try {
            val json = JSONObject()
            json.put("notification", notification.toJson())
            json.put("action", action.toJson())
            if (error != null) json.put("error", error.localizedMessage)

            NotificarePushUIPluginEventBroker.dispatchEvent("action_failed_to_execute", json)
        } catch (e: Exception) {
            logger.error("Failed to emit the action_failed_to_execute event.", e)
        }
    }

    override fun onCustomActionReceived(
        notification: NotificareNotification,
        action: NotificareNotification.Action,
        uri: Uri
    ) {
        try {
            val json = JSONObject()
            json.put("notification", notification.toJson())
            json.put("action", action.toJson())
            json.put("url", uri.toString())

            NotificarePushUIPluginEventBroker.dispatchEvent("custom_action_received", uri.toString())
        } catch (e: Exception) {
            logger.error("Failed to emit the custom_action_received event.", e)
        }
    }

    // endregion

    private fun registerListener(@Suppress("UNUSED_PARAMETER") args: CordovaArgs, callback: CallbackContext) {
        NotificarePushUIPluginEventBroker.setup(preferences, object : NotificarePushUIPluginEventBroker.Consumer {
            override fun onEvent(event: NotificarePushUIPluginEventBroker.Event) {
                val payload = JSONObject()
                payload.put("name", event.name)
                when (event.payload) {
                    null -> {} // Skip encoding null payloads.
                    is Boolean -> payload.put("data", event.payload)
                    is Int -> payload.put("data", event.payload)
                    is Float -> payload.put("data", event.payload)
                    is Double -> payload.put("data", event.payload)
                    is String -> payload.put("data", event.payload)
                    is JSONObject -> payload.put("data", event.payload)
                    is JSONArray -> payload.put("data", event.payload)
                    else -> throw IllegalArgumentException("Unsupported event payload of type '${event.payload::class.java.simpleName}'.")
                }

                val result = PluginResult(PluginResult.Status.OK, payload)
                result.keepCallback = true

                callback.sendPluginResult(result)
            }
        })
    }
}

private fun CallbackContext.void() {
    sendPluginResult(PluginResult(PluginResult.Status.OK, null as String?))
}
