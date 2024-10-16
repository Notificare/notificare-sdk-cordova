import CoreLocation
import NotificareKit
import NotificareGeoKit

fileprivate let REQUESTED_LOCATION_ALWAYS_KEY = "re.notifica.geo.cordova.requested_location_always"

@objc(NotificareGeoPlugin)
class NotificareGeoPlugin : CDVPlugin {
    private var locationManager: CLLocationManager!
    private var requestedPermission: PermissionGroup?
    private var requestedPermissionCall: CDVInvokedUrlCommand?

    private var authorizationStatus: CLAuthorizationStatus {
        if #available(iOS 14.0, *) {
            return locationManager.authorizationStatus
        }

        return CLLocationManager.authorizationStatus()
    }

    override func pluginInitialize() {
        super.pluginInitialize()

        Notificare.shared.geo().delegate = self

        locationManager = CLLocationManager()
        locationManager.delegate = self
    }

    @objc func registerListener(_ command: CDVInvokedUrlCommand) {
        NotificareGeoPluginEventBroker.startListening(settings: commandDelegate.settings) { event in
            var payload: [String: Any] = [
                "name": event.name,
            ]

            if let data = event.payload {
                payload["data"] = data
            }

            let result = CDVPluginResult(status: .ok, messageAs: payload)
            result!.keepCallback = true

            self.commandDelegate!.send(result, callbackId: command.callbackId)
        }
    }

    // MARK: - Notificare Geo

    @objc func hasLocationServicesEnabled(_ command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: Notificare.shared.geo().hasLocationServicesEnabled)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func hasBluetoothEnabled(_ command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: Notificare.shared.geo().hasBluetoothEnabled)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func getMonitoredRegions(_ command: CDVInvokedUrlCommand) {
        do {
            let items = try Notificare.shared.geo().monitoredRegions.map { try $0.toJson() }

            let result = CDVPluginResult(status: .ok, messageAs: items)
            self.commandDelegate!.send(result, callbackId: command.callbackId)
        } catch {
            let result = CDVPluginResult(status: .error, messageAs: error.localizedDescription)
            self.commandDelegate!.send(result, callbackId: command.callbackId)
        }
    }

    @objc func getEnteredRegions(_ command: CDVInvokedUrlCommand) {
        do {
            let items = try Notificare.shared.geo().enteredRegions.map { try $0.toJson() }

            let result = CDVPluginResult(status: .ok, messageAs: items)
            self.commandDelegate!.send(result, callbackId: command.callbackId)
        } catch {
            let result = CDVPluginResult(status: .error, messageAs: error.localizedDescription)
            self.commandDelegate!.send(result, callbackId: command.callbackId)
        }
    }

    @objc func enableLocationUpdates(_ command: CDVInvokedUrlCommand) {
        Notificare.shared.geo().enableLocationUpdates()

        let result = CDVPluginResult(status: .ok)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func disableLocationUpdates(_ command: CDVInvokedUrlCommand) {
        Notificare.shared.geo().disableLocationUpdates()

        let result = CDVPluginResult(status: .ok)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func checkPermissionStatus(_ command: CDVInvokedUrlCommand) {
        guard let permissionStr = command.argument(at: 0) as? String, let permission = PermissionGroup(rawValue: permissionStr) else {
            let result = CDVPluginResult(status: .error, messageAs: "Missing 'permission' parameter.")
            self.commandDelegate!.send(result, callbackId: command.callbackId)
            return
        }

        let status = checkPermissionStatus(permission)

        let result = CDVPluginResult(status: .ok, messageAs: status.rawValue)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func shouldShowPermissionRationale(_ command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: false)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func presentPermissionRationale(_ command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .error, messageAs: "This method is not implemented in iOS.")
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc func requestPermission(_ command: CDVInvokedUrlCommand) {
        guard let permissionStr = command.argument(at: 0) as? String, let permission = PermissionGroup(rawValue: permissionStr) else {
            let result = CDVPluginResult(status: .error, messageAs: "Missing 'permission' parameter.")
            self.commandDelegate!.send(result, callbackId: command.callbackId)
            return
        }

        let status = checkPermissionStatus(permission)

        if status == .granted || status == .permanentlyDenied || status == .restricted {
            let result = CDVPluginResult(status: .ok, messageAs: status.rawValue)
            self.commandDelegate!.send(result, callbackId: command.callbackId)
            return
        }

        if permission == .locationWhenInUse {
            if ((Bundle.main.infoDictionary?["NSLocationWhenInUseUsageDescription"]) == nil) {
                let result = CDVPluginResult(status: .error, messageAs: "Missing 'NSLocationWhenInUseUsageDescription' in the app bundle's Info.plist file.")
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
            }
        }

        if permission == .locationAlways {
            if (Bundle.main.infoDictionary?["NSLocationAlwaysAndWhenInUseUsageDescription"]) == nil {
                let result = CDVPluginResult(status: .error, messageAs: "Missing 'NSLocationAlwaysAndWhenInUseUsageDescription' in the app bundle's Info.plist file.")
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
            }

            if authorizationStatus == .notDetermined {
                let result = CDVPluginResult(status: .error, messageAs: "Location 'When in Use' should be requested before 'Location Always' request.")
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
            }
        }

        requestedPermission = permission
        requestedPermissionCall = command

        if permission == .locationWhenInUse {
            locationManager.requestWhenInUseAuthorization()
        } else if permission == .locationAlways {
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(applicationDidBecomeActive),
                name: UIApplication.didBecomeActiveNotification,
                object: nil
            )

            locationManager.requestAlwaysAuthorization()
            UserDefaults.standard.set(true, forKey: REQUESTED_LOCATION_ALWAYS_KEY)
        }
    }

    @objc func openAppSettings(_ command: CDVInvokedUrlCommand) {
        DispatchQueue.main.async {
            guard let url = URL(string: UIApplication.openSettingsURLString), UIApplication.shared.canOpenURL(url) else {
                let result = CDVPluginResult(status: .error, messageAs: "Unable to open the application settings.")
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
            }

            UIApplication.shared.open(url) { success in
                if success {
                    let result = CDVPluginResult(status: .ok)
                    self.commandDelegate!.send(result, callbackId: command.callbackId)
                } else {
                    let result = CDVPluginResult(status: .error, messageAs: "Unable to open the application settings.")
                    self.commandDelegate!.send(result, callbackId: command.callbackId)
                }
            }
        }
    }

    // MARK: - Private API

    @objc private func applicationDidBecomeActive() {
        NotificationCenter.default.removeObserver(
            self,
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )

        guard let requestedPermissionCall = requestedPermissionCall else {
            return
        }

        if authorizationStatus != .authorizedAlways {
            let result = CDVPluginResult(status: .ok, messageAs: PermissionStatus.denied.rawValue)
            self.commandDelegate!.send(result, callbackId: requestedPermissionCall.callbackId)

            self.requestedPermission = nil
            self.requestedPermissionCall = nil
        }
    }

    private func checkPermissionStatus(_ permission: PermissionGroup) -> PermissionStatus {
        guard permission != .bluetoothScan else {
            return .granted
        }

        return determinePermissionStatus(permission, authorizationStatus: authorizationStatus)
    }

    private func determinePermissionStatus(_ permission: PermissionGroup, authorizationStatus: CLAuthorizationStatus) -> PermissionStatus {
        if permission == .locationAlways {
            switch authorizationStatus {
            case .notDetermined:
                return .denied
            case .restricted:
                return .restricted
            case .denied:
                return .permanentlyDenied
            case .authorizedWhenInUse:
                return UserDefaults.standard.bool(forKey: REQUESTED_LOCATION_ALWAYS_KEY) ? .permanentlyDenied : .denied
            case .authorizedAlways:
                return .granted
            @unknown default:
                return .denied
            }
        }

        switch authorizationStatus {
        case .notDetermined:
            return .denied
        case .restricted:
            return .restricted
        case .denied:
            return .permanentlyDenied
        case .authorizedWhenInUse, .authorizedAlways:
            return .granted
        @unknown default:
            return .denied
        }
    }
}

extension NotificareGeoPlugin: NotificareGeoDelegate {
    func notificare(_ notificareGeo: NotificareGeo, didUpdateLocations locations: [NotificareLocation]) {
        guard let location = locations.first else { return }

        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "location_updated",
                payload: try location.toJson()
            )
        } catch {
            logger.error("Failed to emit the location_updated event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didEnter region: NotificareRegion) {
        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "region_entered",
                payload: try region.toJson()
            )
        } catch {
            logger.error("Failed to emit the region_entered event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didExit region: NotificareRegion) {
        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "region_exited",
                payload: try region.toJson()
            )
        } catch {
            logger.error("Failed to emit the region_exited event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didEnter beacon: NotificareBeacon) {
        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "beacon_entered",
                payload: try beacon.toJson()
            )
        } catch {
            logger.error("Failed to emit the beacon_entered event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didExit beacon: NotificareBeacon) {
        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "beacon_exited",
                payload: try beacon.toJson()
            )
        } catch {
            logger.error("Failed to emit the beacon_exited event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didRange beacons: [NotificareBeacon], in region: NotificareRegion) {
        do {
            let payload: [String: Any] = [
                "region": try region.toJson(),
                "beacons": try beacons.map { try $0.toJson() },
            ]

            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "beacons_ranged",
                payload: payload
            )
        } catch {
            logger.error("Failed to emit the beacons_ranged event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didVisit visit: NotificareVisit) {
        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "visit",
                payload: try visit.toJson()
            )
        } catch {
            logger.error("Failed to emit the visit event.", error: error)
        }
    }

    func notificare(_ notificareGeo: NotificareGeo, didUpdateHeading heading: NotificareHeading) {
        do {
            NotificareGeoPluginEventBroker.dispatchEvent(
                name: "heading_updated",
                payload: try heading.toJson()
            )
        } catch {
            logger.error("Failed to emit the heading_updated event.", error: error)
        }
    }
}

extension NotificareGeoPlugin: CLLocationManagerDelegate {
    public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        handleAuthorizationChange(status)
    }

    @available(iOS 14.0, *)
    public func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        handleAuthorizationChange(manager.authorizationStatus)
    }

    private func handleAuthorizationChange(_ authorizationStatus: CLAuthorizationStatus) {
        if authorizationStatus == .notDetermined {
            // When the user changes to "Ask Next Time" via the Settings app.
            UserDefaults.standard.removeObject(forKey: REQUESTED_LOCATION_ALWAYS_KEY)
        }

        guard let requestedPermission = requestedPermission, let requestedPermissionCall = requestedPermissionCall else {
            return
        }

        let status = determinePermissionStatus(requestedPermission, authorizationStatus: authorizationStatus)

        // If status is 'Permanently Denied' we will consider that result as 'Denied' because the permission just changed
        // This will only affect 'When in Use' permission

        if status == .permanentlyDenied {
            let result = CDVPluginResult(status: .ok, messageAs: PermissionStatus.denied.rawValue)
            self.commandDelegate!.send(result, callbackId: requestedPermissionCall.callbackId)
        } else {
            let result = CDVPluginResult(status: .ok, messageAs: status.rawValue)
            self.commandDelegate!.send(result, callbackId: requestedPermissionCall.callbackId)
        }

        self.requestedPermission = nil
        self.requestedPermissionCall = nil
    }
}

extension NotificareGeoPlugin {
    internal enum PermissionGroup: String, CaseIterable {
        case locationWhenInUse = "location_when_in_use"
        case locationAlways = "location_always"
        case bluetoothScan = "bluetooth_scan"
    }

    internal enum PermissionStatus: String, CaseIterable {
        case denied = "denied"
        case granted = "granted"
        case restricted = "restricted"
        case permanentlyDenied = "permanently_denied"
    }
}
