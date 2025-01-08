import { EventSubscription } from './events';
import { NotificareLocation } from './models/notificare-location';
import { NotificareRegion } from './models/notificare-region';
import { NotificareBeacon } from './models/notificare-beacon';
import { NotificareVisit } from './models/notificare-visit';
import { NotificareHeading } from './models/notificare-heading';
import { PermissionGroup, PermissionRationale, PermissionStatus } from './permissions';

export class NotificareGeo {
  /**
   * Indicates whether location services are enabled.
   *
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the
   * location services are enabled by the application, and `false` otherwise.
   */
  public static async hasLocationServicesEnabled(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'hasLocationServicesEnabled', []);
    });
  }

  /**
   * Indicates whether Bluetooth is enabled.
   *
   * @returns {Promise<boolean>} - A promise that resolves to `true` if Bluetooth
   * is enabled and available for beacon detection and ranging, and `false` otherwise.
   */
  public static async hasBluetoothEnabled(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'hasBluetoothEnabled', []);
    });
  }

  /**
   * Provides a list of regions currently being monitored.
   *
   * @returns {Promise<NotificareRegion[]>} - A promise that resolves to  a list
   * of {@link NotificareRegion} objects representing the geographical regions
   * being actively monitored for entry and exit events.
   */
  public static async getMonitoredRegions(): Promise<NotificareRegion[]> {
    return new Promise<NotificareRegion[]>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'getMonitoredRegions', []);
    });
  }

  /**
   * Provides a list of regions the user has entered.
   *
   * @returns {Promise<NotificareRegion[]>} - A promise that resolves to a list
   * of {@link NotificareRegion} objects representing the regions that the user
   * has entered and not yet exited.
   */
  public static async getEnteredRegions(): Promise<NotificareRegion[]> {
    return new Promise<NotificareRegion[]>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'getEnteredRegions', []);
    });
  }

  /**
   * Enables location updates, activating location tracking, region monitoring,
   * and beacon detection.
   *
   * **Note**: This function requires explicit location permissions from the user.
   * Starting with Android 10 (API level 29), background location access requires
   * the ACCESS_BACKGROUND_LOCATION permission. For beacon detection, Bluetooth
   * permissions are also necessary. Ensure all permissions are requested before
   * invoking this method.
   *
   * The behavior varies based on granted permissions:
   * - **Permission denied**: Clears the device's location information.
   * - **When In Use permission granted**: Tracks location only while the
   * app is in use.
   * - **Always permission granted**: Enables geofencing capabilities.
   * - **Always + Bluetooth permissions granted**: Enables geofencing
   * and beacon detection.
   *
   * @returns {Promise<void>} - A promise that resolves when location updates
   * have been successfully enabled.
   */
  public static async enableLocationUpdates(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'enableLocationUpdates', []);
    });
  }

  /**
   * Disables location updates.
   *
   * This method stops receiving location updates, monitoring regions, and
   * detecting nearby beacons.
   *
   * @returns {Promise<void>} - A promise that resolves when location updates
   * have been successfully disabled.
   */
  public static async disableLocationUpdates(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'disableLocationUpdates', []);
    });
  }

  //
  // Permission utilities
  //

  /**
   * Checks the current status of a specific permission.
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} to
   * check the status for.
   * @returns {Promise<PermissionStatus>} - A promise that resolves to a
   * {@link PermissionStatus} enum containing the given permission status.
   */
  public static async checkPermissionStatus(permission: PermissionGroup): Promise<PermissionStatus> {
    return new Promise<PermissionStatus>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'checkPermissionStatus', [permission]);
    });
  }

  /**
   * Determines if the app should display a rationale for requesting the specified permission.
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} to evaluate
   * if a permission rationale is needed.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if a rationale
   * should be shown, or `false` otherwise.
   */
  public static async shouldShowPermissionRationale(permission: PermissionGroup): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'shouldShowPermissionRationale', [permission]);
    });
  }

  /**
   * Presents a rationale to the user for requesting a specific permission.
   *
   * This method displays a custom rationale message to the user, explaining why the app requires
   * the specified permission. The rationale should be presented prior to initiating the permission
   * request if a rationale is deemed necessary.
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} being requested.
   * @param {PermissionRationale }rationale - The {@link PermissionRationale} details,
   * including the title and message to present to the user.
   * @returns {Promise<void>} - A promise that resolves once the rationale has been
   * successfully presented to the user.
   */
  public static async presentPermissionRationale(
    permission: PermissionGroup,
    rationale: PermissionRationale
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'presentPermissionRationale', [permission, rationale]);
    });
  }

  /**
   * Requests a specific permission from the user.
   *
   * This method prompts the user to grant or deny the specified permission. The returned status
   * indicates the result of the user's decision, which can be one of several states such as
   * "granted", "denied", "restricted", or "permanently_denied".
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} being requested.
   * @returns {Promise<PermissionStatus>} - A promise that resolves to a {@link PermissionStatus}
   * enum containing the requested permission status.
   */
  public static async requestPermission(permission: PermissionGroup): Promise<PermissionStatus> {
    return new Promise<PermissionStatus>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'requestPermission', [permission]);
    });
  }

  /**
   *  Opens the application's settings page.
   *
   *  @returns {Promise<void>} - A promise that resolves when the application
   *  settings page has been successfully opened.
   */
  public static async openAppSettings(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareGeo', 'openAppSettings', []);
    });
  }

  // region Events

  /**
   * Called when a new location update is received.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onLocationUpdated event. It will provide the updated {@link NotificareLocation}
   * object representing the user's new location.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onLocationUpdated
   * event.
   */
  public static onLocationUpdated(callback: (location: NotificareLocation) => void): EventSubscription {
    return new EventSubscription('location_updated', callback);
  }

  /**
   * Called when the user enters a monitored region.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onRegionEntered event. It will provide the {@link NotificareRegion}
   * representing the region the user has entered.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onRegionEntered
   * event.
   */
  public static onRegionEntered(callback: (region: NotificareRegion) => void): EventSubscription {
    return new EventSubscription('region_entered', callback);
  }

  /**
   * Called when the user exits a monitored region.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onRegionExited event. It will provide the {@link NotificareRegion}
   * representing the region the user has exited.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onRegionExited
   * event.
   */
  public static onRegionExited(callback: (region: NotificareRegion) => void): EventSubscription {
    return new EventSubscription('region_exited', callback);
  }

  /**
   * Called when the user enters the proximity of a beacon.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onBeaconEntered event. It will provide the {@link NotificareBeacon}
   * representing the beacon the user has entered the proximity of.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onBeaconEntered
   * event.
   */
  public static onBeaconEntered(callback: (beacon: NotificareBeacon) => void): EventSubscription {
    return new EventSubscription('beacon_entered', callback);
  }

  /**
   * Called when the user exits the proximity of a beacon.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onBeaconExited event. It will provide the {@link NotificareBeacon}
   * representing the beacon the user has exited the proximity of.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onBeaconExited
   * event.
   */
  public static onBeaconExited(callback: (beacon: NotificareBeacon) => void): EventSubscription {
    return new EventSubscription('beacon_exited', callback);
  }

  /**
   * Called when beacons are ranged in a monitored region.
   *
   * This method provides the list of beacons currently detected within the given
   * region.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onBeaconsRanged event. It will provide a list of {@link NotificareBeacon}
   * that were detected and the {@link NotificareRegion} where they were detected.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onBeaconsRanged
   * event.
   */
  public static onBeaconsRanged(
    callback: (data: { region: NotificareRegion; beacons: NotificareBeacon[] }) => void
  ): EventSubscription {
    return new EventSubscription('beacons_ranged', callback);
  }

  /**
   * Called when the device registers a location visit.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onVisit event. It will provide a {@link NotificareVisit} object representing
   * the details of the visit.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onVisit
   * event.
   */
  public static onVisit(callback: (visit: NotificareVisit) => void): EventSubscription {
    return new EventSubscription('visit', callback);
  }

  /**
   * Called when there is an update to the device’s heading.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onHeadingUpdated event. It will provide a {@link NotificareHeading} object
   * containing the details of the updated heading.
   * @returns {EventSubscription} - The {@link EventSubscription} for the onHeadingUpdated
   * event.
   */
  public static onHeadingUpdated(callback: (heading: NotificareHeading) => void): EventSubscription {
    return new EventSubscription('heading_updated', callback);
  }

  // endregion
}
