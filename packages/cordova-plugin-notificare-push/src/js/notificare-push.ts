import { EventSubscription } from './events';
import { NotificareNotification, NotificareNotificationAction } from 'cordova-plugin-notificare';
import { NotificareSystemNotification } from './models/notificare-system-notification';
import { NotificareNotificationDeliveryMechanism } from './models/notificare-notification-delivery-mechanism';
import { PushPermissionRationale, PushPermissionStatus } from './permissions';
import { NotificareTransport } from './models/notificare-transport';
import { NotificarePushSubscription } from './models/notificare-push-subscription';

export class NotificarePush {
  /**
   * Defines the authorization options used when requesting push notification
   * permissions.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param options The authorization options to be set.
   */
  public static async setAuthorizationOptions(options: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'setAuthorizationOptions', [options]);
    });
  }

  /**
   * Defines the notification category options for custom notification actions.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param options The category options to be set
   */
  public static async setCategoryOptions(options: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'setCategoryOptions', [options]);
    });
  }

  /**
   * Defines the presentation options for displaying notifications while the app
   * is in the foreground.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param options The presentation options to be set.
   */
  public static async setPresentationOptions(options: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'setPresentationOptions', [options]);
    });
  }

  /**
   * Indicates whether remote notifications are enabled.
   *
   * @returns `true` if remote notifications are enabled for the application, and
   * `false` otherwise.
   */
  public static async hasRemoteNotificationsEnabled(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'hasRemoteNotificationsEnabled', []);
    });
  }

  /**
   * Provides the current push transport information.
   *
   * @returns The {@link NotificareTransport} assigned to the device.
   */
  public static async getTransport(): Promise<NotificareTransport | null> {
    return new Promise<NotificareTransport | null>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'getTransport', []);
    });
  }

  /**
   * Provides the current push subscription token.
   *
   * @returns the {@link NotificarePushSubscription} object containing the
   * device's current push subscription token, or `null` if no token is available.
   */
  public static async getSubscription(): Promise<NotificarePushSubscription | null> {
    return new Promise<NotificarePushSubscription | null>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'getSubscription', []);
    });
  }

  /**
   * Indicates whether the device is capable of receiving remote notifications.
   *
   * This function returns `true` if the user has granted permission to receive
   * push notifications and the device has successfully obtained a push token
   * from the notification service. It reflects whether the app can present
   * notifications as allowed by the system and user settings.
   *
   * @return `true` if the device can receive remote notifications, `false`
   * otherwise.
   */
  public static async allowedUI(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'allowedUI', []);
    });
  }

  /**
   * Enables remote notifications.
   *
   * This function enables remote notifications for the application,
   * allowing push notifications to be received.
   *
   * **Note**: Starting with Android 13 (API level 33), this function requires
   * the developer to explicitly request the `POST_NOTIFICATIONS` permission from
   * the user.
   */
  public static async enableRemoteNotifications(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'enableRemoteNotifications', []);
    });
  }

  /**
   * Disables remote notifications.
   *
   * This function disables remote notifications for the application, preventing
   * push notifications from being received.
   */
  public static async disableRemoteNotifications(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'disableRemoteNotifications', []);
    });
  }

  //
  // Permission utilities
  //

  /**
   * Checks the current status of the push permission.
   *
   * @returns A {@link PushPermissionStatus} enum containing the given permission status.
   */
  public static async checkPermissionStatus(): Promise<PushPermissionStatus> {
    return new Promise<PushPermissionStatus>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'checkPermissionStatus', []);
    });
  }

  /**
   * Determines if the app should display a rationale for requesting the push permission.
   *
   * @returns `true` if a rationale should be shown, or `false` otherwise.
   */
  public static async shouldShowPermissionRationale(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'shouldShowPermissionRationale', []);
    });
  }

  /**
   * Presents a rationale to the user for requesting the push permission.
   *
   * This method displays a custom rationale message to the user, explaining why the app requires
   * push permission. The rationale should be presented prior to initiating the permission
   * request if a rationale is deemed necessary.
   *
   * @param rationale - The {@link PushPermissionRationale} details, including the title and message to present to the
   * user.
   */
  public static async presentPermissionRationale(rationale: PushPermissionRationale): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'presentPermissionRationale', [rationale]);
    });
  }

  /**
   * Requests the push permission from the user.
   *
   * This method prompts the user to grant or deny push permission. The returned status
   * indicates the result of the user's decision, which can be one of several states such as
   * "granted", "denied" or "permanently_denied".
   *
   * @returns A {@link PushPermissionStatus} enum containing the push permission status.
   */
  public static async requestPermission(): Promise<PushPermissionStatus> {
    return new Promise<PushPermissionStatus>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'requestPermission', []);
    });
  }

  /**
   *  Opens the application's settings page.
   */
  public static async openAppSettings(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificarePush', 'openAppSettings', []);
    });
  }

  // region Events

  /**
   * Called when a push notification is received.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationInfoReceived event. It will provide the
   * {@link NotificareNotification} received and the
   * {@link NotificareNotificationDeliveryMechanism} used for its delivery.
   */
  public static onNotificationInfoReceived(
    callback: (data: {
      notification: NotificareNotification;
      deliveryMechanism: NotificareNotificationDeliveryMechanism;
    }) => void
  ): EventSubscription {
    return new EventSubscription('notification_info_received', callback);
  }

  /**
   * Called when a custom system notification is received.
   *
   * @param callback A callback that will be invoked with the result of the
   * onSystemNotificationReceived event. It will provide the
   * {@link NotificareSystemNotification} received.
   */
  public static onSystemNotificationReceived(
    callback: (notification: NotificareSystemNotification) => void
  ): EventSubscription {
    return new EventSubscription('system_notification_received', callback);
  }

  /**
   * Called when an unknown notification is received.
   *
   * @param callback A callback that will be invoked with the result of the
   * onUnknownNotificationReceived event. It will provide the unknown
   * notification received.
   */
  public static onUnknownNotificationReceived(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (notification: Record<string, any>) => void
  ): EventSubscription {
    return new EventSubscription('unknown_notification_received', callback);
  }

  /**
   * Called when a push notification is opened by the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationOpened event. It will provide the
   * {@link NotificareNotification} that was opened.
   */
  public static onNotificationOpened(callback: (notification: NotificareNotification) => void): EventSubscription {
    return new EventSubscription('notification_opened', callback);
  }

  /**
   * Called when an unknown notification is opened by the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onUnknownNotificationOpened event. It will provide the unknown notification
   * that was opened.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static onUnknownNotificationOpened(callback: (notification: Record<string, any>) => void): EventSubscription {
    return new EventSubscription('unknown_notification_opened', callback);
  }

  /**
   * Called when a push notification action is opened by the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationActionOpened event. It will provide the
   * {@link NotificareNotificationAction} opened by the user and the
   * {@link NotificareNotification} containing it.
   */
  public static onNotificationActionOpened(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): EventSubscription {
    return new EventSubscription('notification_action_opened', callback);
  }

  /**
   * Called when an unknown notification action is opened by the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onUnknownNotificationActionOpened event. It will provide the
   * action opened by the user and the unknown notification containing it. It
   * will also provide a response text, if it exists.
   */
  public static onUnknownNotificationActionOpened(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (data: { notification: Record<string, any>; action: string; responseText?: string }) => void
  ): EventSubscription {
    return new EventSubscription('unknown_notification_action_opened', callback);
  }

  /**
   * Called when the notification settings are changed.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationSettingsChanged event. It will provide a boolean indicating
   * whether the app is permitted to display notifications. `true` if
   * notifications are allowed, `false` if they are restricted by the user.
   */
  public static onNotificationSettingsChanged(callback: (granted: boolean) => void): EventSubscription {
    return new EventSubscription('notification_settings_changed', callback);
  }

  /**
   * Called when the device's push subscription changes.
   *
   * @param callback A callback that will be invoked with the result of the
   * onSubscriptionChanged event. It will provide the updated
   * {@link NotificarePushSubscription}, or `null` if the subscription token is
   * unavailable.
   */
  public static onSubscriptionChanged(
    callback: (subscription: NotificarePushSubscription | undefined) => void
  ): EventSubscription {
    return new EventSubscription('subscription_changed', callback);
  }

  /**
   * Called when a notification prompts the app to open its settings screen.
   *
   * @param callback A callback that will be invoked with the result of the
   * onShouldOpenNotificationSettings event. It will provide the
   * {@link NotificareNotification} that prompted the app to open its settings
   * screen.
   */
  public static onShouldOpenNotificationSettings(
    callback: (notification: NotificareNotification | null) => void
  ): EventSubscription {
    return new EventSubscription('should_open_notification_settings', callback);
  }

  /**
   *  Called when the app encounters an error during the registration process for
   *  push notifications.
   *
   * @param callback A callback that will be invoked with the result of the
   * onFailedToRegisterForRemoteNotifications event. It will provide the error
   * that caused the registration to fail.
   */
  public static onFailedToRegisterForRemoteNotifications(callback: (error: string) => void): EventSubscription {
    return new EventSubscription('failed_to_register_for_remote_notifications', callback);
  }

  // endregion
}
