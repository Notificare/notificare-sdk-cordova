import { NotificareDeviceModule } from './notificare-device-module';
import { NotificareEventsModule } from './notificare-events-module';
import { EventSubscription } from './events';
import { NotificareApplication } from './models/notificare-application';
import { NotificareNotification } from './models/notificare-notification';
import { NotificareDevice } from './models/notificare-device';
import { NotificareDynamicLink } from './models/notificare-dynamic-link';

export class Notificare {
  private static readonly deviceModule = new NotificareDeviceModule();
  private static readonly eventsModule = new NotificareEventsModule();

  //
  // Modules
  //

  public static device(): NotificareDeviceModule {
    return this.deviceModule;
  }

  public static events(): NotificareEventsModule {
    return this.eventsModule;
  }

  //
  // Methods
  //

  /**
   * Indicates whether Notificare has been configured.
   *
   * @returns `true` if Notificare is successfully configured, and `false`
   * otherwise.
   */
  public static async isConfigured(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'isConfigured', []);
    });
  }

  /**
   * Indicates whether Notificare is ready.
   *
   * @returns `true` once the SDK has completed the initialization process and
   * is ready for use.
   */
  public static async isReady(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'isReady', []);
    });
  }

  /**
   * Launches the Notificare SDK, and all the additional available modules,
   * preparing them for use.
   */
  public static async launch(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'launch', []);
    });
  }

  /**
   * Unlaunches the Notificare SDK.
   *
   * This method shuts down the SDK, removing all data, both locally and remotely
   * in the servers. It destroys all the device's data permanently.
   */
  public static async unlaunch(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'unlaunch', []);
    });
  }

  /**
   * Provides the current application metadata, if available.
   *
   * @returns the {@link NotificareApplication} object representing the configured
   * application, or `null` if the application is not yet available.
   */
  public static async getApplication(): Promise<NotificareApplication | null> {
    return new Promise<NotificareApplication>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'getApplication', []);
    });
  }

  /**
   * Fetches the application metadata.
   *
   * @return The {@link NotificareApplication} metadata.
   */
  public static async fetchApplication(): Promise<NotificareApplication> {
    return new Promise<NotificareApplication>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'fetchApplication', []);
    });
  }

  /**
   * Fetches a {@link NotificareNotification} by its ID.
   *
   * @param id The ID of the notification to fetch.
   * @return The {@link NotificareNotification} object associated with the
   * provided ID.
   */
  public static async fetchNotification(id: string): Promise<NotificareNotification> {
    return new Promise<NotificareNotification>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'fetchNotification', [id]);
    });
  }

  /**
   * Fetches a {@link NotificareDynamicLink} from a URL.
   *
   * @param url The URL to fetch the dynamic link from.
   * @return The {@link NotificareDynamicLink} object.
   */
  public static async fetchDynamicLink(url: string): Promise<NotificareDynamicLink> {
    return new Promise<NotificareDynamicLink>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'fetchDynamicLink', [url]);
    });
  }

  /**
   * Checks if a deferred link exists and can be evaluated.
   *
   * @return `true` if a deferred link can be evaluated, `false` otherwise.
   */
  public static async canEvaluateDeferredLink(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'canEvaluateDeferredLink', []);
    });
  }

  /**
   * Evaluates the deferred link. Once the deferred link is evaluated, Notificare
   * will open the resolved deep link.
   *
   * @return `true` if the deferred link was successfully evaluated, `false`
   * otherwise.
   */
  public static async evaluateDeferredLink(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'evaluateDeferredLink', []);
    });
  }

  //
  // Events
  //

  /**
   * Called when the Notificare SDK is fully ready and the application metadata
   * is available.
   *
   * This method is invoked after the SDK has been successfully launched and is
   * available for use.
   *
   * @param callback A callback that will be invoked with the result of the
   * onReady event. It will the {@link NotificareApplication} object containing
   * the application's metadata.
   */
  static onReady(callback: (application: NotificareApplication) => void): EventSubscription {
    return new EventSubscription('ready', callback);
  }

  /**
   * Called when the Notificare SDK has been unlaunched.
   *
   * This method is invoked after the SDK has been shut down (unlaunched) and
   * is no longer in use.
   *
   * @param callback A callback that will be invoked with the result of the
   * onUnlaunched event.
   */
  static onUnlaunched(callback: () => void): EventSubscription {
    return new EventSubscription('unlaunched', callback);
  }

  /**
   * Called when the device has been successfully registered with the Notificare
   * platform.
   *
   * This method is triggered once after the device has been registered, and will
   * only be triggered again when a new device is created after an unlaunch() is
   * called.
   *
   * @param callback A callback that will be invoked with the result of the
   * onDeviceRegistered event. It will provide the registered {@link NotificareDevice}
   * instance representing the device's registration details.
   */
  static onDeviceRegistered(callback: (device: NotificareDevice) => void): EventSubscription {
    return new EventSubscription('device_registered', callback);
  }

  /**
   * Called when the device opens a URL.
   *
   * This method is invoked when the device opens a URL.
   *
   * @param callback A callback that will be invoked with the result of the
   * onUrlOpened event. It will provide the opened URL.
   */
  static onUrlOpened(callback: (url: string) => void): EventSubscription {
    return new EventSubscription('url_opened', callback);
  }
}
