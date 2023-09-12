document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
  setupHomeListeners();

  try {
    if (await Notificare.isReady()) {
      onNotificareReady();

      return;
    }
  } catch (e) {
    console.log(e);
    enqueueToast('Error checking isReady.', 'error');
  }

  launchNotificare();
}

function setupHomeListeners() {
  Notificare.onReady(async () => {
    if (await NotificarePush.hasRemoteNotificationsEnabled()) {
      await NotificarePush.enableRemoteNotifications();
    }

    if (await NotificareGeo.hasLocationServicesEnabled()) {
      await NotificareGeo.enableLocationUpdates();
    }

    onNotificareReady();
  });

  Notificare.onUnlaunched(() => onNotificareUnlaunched());
}

function onNotificareReady() {
  const homeContainer = document.getElementById('homeContainer');

  const homeContainerContent = `
            <div w3-include-html="views/current-device-card/current-device-card-view.html"></div>
            <div w3-include-html="views/remote-notifications-card/remote-notifications-card-view.html"></div>
            <div w3-include-html="views/dnd-card/dnd-card-view.html"></div>
            <div w3-include-html="views/geo-card/geo-card-view.html"></div>
            <div w3-include-html="views/iam-card/iam-card-view.html"></div>
            <div w3-include-html="views/other-features/other-features-view.html"></div>
  `;

  homeContainer.innerHTML = homeContainerContent;

  addHTML();
}

function onNotificareUnlaunched() {
  const homeContainer = document.getElementById('homeContainer');
  homeContainer.innerHTML = '';
}

async function launchNotificare() {
  console.log(`---> Launching Notificare <---`);

  try {
    await NotificarePush.setPresentationOptions(['banner', 'badge', 'sound']);
    await Notificare.launch();
  } catch (e) {
    console.log('=== Error launching notificare ===');
    console.log(e);

    enqueueToast('Error launching notificare.', 'error');
  }
}
