document.addEventListener('deviceready', setupListeners, false);

function setupListeners() {
  console.log(`---> Setup Notificare Listeners <---`);

  Notificare.onReady((application) => {
    console.log('=======================');
    console.log('= NOTIFICARE IS READY =');
    console.log('=======================');
    console.log(JSON.stringify(application));
  });

  Notificare.onUnlaunched((application) => {
    console.log('=======================');
    console.log('= NOTIFICARE UNLAUNCHED =');
    console.log('=======================');
    console.log(JSON.stringify(application));
  });

  Notificare.onUrlOpened((url) => {
    console.log(`---> On URL opened = ${url}`);
  });

  Notificare.onDeviceRegistered((device) => {
    console.log(`---> Device registered: ${JSON.stringify(device)}`);
  });

  NotificarePush.onNotificationInfoReceived(({ notification, deliveryMechanism }) => {
    console.log(`---> Received notification = ${JSON.stringify(notification)}`);
    console.log(`---> Delivery mechanism = ${deliveryMechanism}`);
  });

  NotificarePush.onUnknownNotificationReceived((notification) => {
    console.log(`---> Unknown notification received = ${JSON.stringify(notification)}`);
  });

  NotificarePush.onNotificationOpened(async (notification) => {
    console.log(`---> Opened notification = ${JSON.stringify(notification)}`);

    await NotificarePushUI.presentNotification(notification);
  });

  NotificarePush.onUnknownNotificationOpened((notification) => {
    console.log(`---> Opened unknown notification = ${JSON.stringify(notification)}`);
  });

  NotificarePush.onNotificationSettingsChanged((granted) => {
    console.log('=== NOTIFICATION SETTINGS CHANGED ===');
    console.log(JSON.stringify(granted, null, 2));
  });

  NotificarePush.onSubscriptionChanged((subscription) => {
    console.log('=== SUBSCRIPTION CHANGED ===');
    console.log(JSON.stringify(subscription, null, 2));
  });

  NotificareInbox.onBadgeUpdated((badge) => {
    console.log(`---> Badge updated = ${badge}`);
  });

  NotificareInbox.onInboxUpdated((items) => {
    console.log(`---> Inbox updated = ${JSON.stringify(items)}`);
  });

  NotificarePushUI.onNotificationWillPresent((notification) => {
    console.log('=== NOTIFICATION WILL PRESENT ===');
    console.log(JSON.stringify(notification));
  });

  NotificarePushUI.onNotificationPresented((notification) => {
    console.log('=== NOTIFICATION PRESENTED ===');
    console.log(JSON.stringify(notification));
  });

  NotificarePushUI.onNotificationFinishedPresenting((notification) => {
    console.log('=== NOTIFICATION FINISHED PRESENTING ===');
    console.log(JSON.stringify(notification));
  });

  NotificarePushUI.onNotificationFailedToPresent((notification) => {
    console.log('=== NOTIFICATION FAILED TO PRESENT ===');
    console.log(JSON.stringify(notification));
  });

  NotificarePushUI.onNotificationUrlClicked((data) => {
    console.log('=== NOTIFICATION URL CLICKED ===');
    console.log(JSON.stringify(data));
  });

  NotificarePushUI.onActionWillExecute((data) => {
    console.log('=== ACTION WILL EXECUTE ===');
    console.log(JSON.stringify(data));
  });

  NotificarePushUI.onActionExecuted((data) => {
    console.log('=== ACTION EXECUTED ===');
    console.log(JSON.stringify(data));
  });

  NotificarePushUI.onActionNotExecuted((data) => {
    console.log('=== ACTION NOT EXECUTED ===');
    console.log(JSON.stringify(data));
  });

  NotificarePushUI.onActionFailedToExecute((data) => {
    console.log('=== ACTION FAILED TO EXECUTE ===');
    console.log(JSON.stringify(data));
  });

  NotificarePushUI.onCustomActionReceived((data) => {
    console.log('=== CUSTOM ACTION RECEIVED ===');
    console.log(JSON.stringify(data));
  });

  NotificareGeo.onLocationUpdated((location) => {
    console.log('=== LOCATION UPDATED ===');
    console.log(JSON.stringify(location, null, 2));
  });

  NotificareGeo.onRegionEntered((region) => {
    console.log('=== REGION ENTERED ===');
    console.log(JSON.stringify(region, null, 2));
  });

  NotificareGeo.onRegionExited((region) => {
    console.log('=== REGION EXITED ===');
    console.log(JSON.stringify(region, null, 2));
  });

  NotificareGeo.onBeaconEntered((beacon) => {
    console.log('=== BEACON ENTERED ===');
    console.log(JSON.stringify(beacon, null, 2));
  });

  NotificareGeo.onBeaconExited((beacon) => {
    console.log('=== BEACON EXITED ===');
    console.log(JSON.stringify(beacon, null, 2));
  });

  NotificareGeo.onBeaconsRanged(({ region, beacons }) => {
    console.log('=== BEACONS RANGED ===');
    console.log(JSON.stringify({ region, beacons }, null, 2));
  });

  NotificareGeo.onVisit((visit) => {
    console.log('=== VISIT ===');
    console.log(JSON.stringify(visit, null, 2));
  });

  NotificareGeo.onHeadingUpdated((heading) => {
    console.log('=== HEADING UPDATED ===');
    console.log(JSON.stringify(heading, null, 2));
  });

  NotificareScannables.onScannableDetected(async (scannable) => {
    console.log('=== SCANNABLE DETECTED ===');
    console.log(JSON.stringify(scannable, null, 2));

    if (scannable.notification != null) {
      await NotificarePushUI.presentNotification(scannable.notification);
    }
  });

  NotificareScannables.onScannableSessionFailed((error) => {
    console.log('=== SCANNABLE SESSION FAILED ===');
    console.log(JSON.stringify(error, null, 2));
  });

  NotificareInAppMessaging.onMessagePresented((message) => {
    console.log('=== MESSAGE PRESENTED ===');
    console.log(JSON.stringify(message, null, 2));
  });

  NotificareInAppMessaging.onMessageFinishedPresenting((message) => {
    console.log('=== MESSAGE FINISHED PRESENTING ===');
    console.log(JSON.stringify(message, null, 2));
  });

  NotificareInAppMessaging.onMessageFailedToPresent((message) => {
    console.log('=== MESSAGE FAILED TO PRESENT ===');
    console.log(JSON.stringify(message, null, 2));
  });

  NotificareInAppMessaging.onActionExecuted(({ message, action }) => {
    console.log('=== ACTION EXECUTED ===');
    console.log(JSON.stringify({ message, action }, null, 2));
  });

  NotificareInAppMessaging.onActionFailedToExecute(({ message, action, error }) => {
    console.log('=== ACTION FAILED TO EXECUTE ===');
    console.log(JSON.stringify({ message, action, error }, null, 2));
  });

  console.log(`---> Notificare Listeners are ready <---`);
}
