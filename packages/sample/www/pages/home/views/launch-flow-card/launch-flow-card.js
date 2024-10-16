document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
  setupLaunchFlowListeners();
  await checkIsReadyStatus();
}

function setupLaunchFlowListeners() {
  Notificare.onReady(() => handleIsReadyStatus(true));

  Notificare.onUnlaunched(() => handleIsReadyStatus(false));
}

async function checkIsReadyStatus() {
  try {
    const isReady = await Notificare.isReady();
    handleIsReadyStatus(isReady);
  } catch (e) {
    console.log('=== Error getting isReady ===');
    console.log(e);

    enqueueToast('Error getting isReady.', 'error');
  }
}

function handleIsReadyStatus(isReady) {
  const launchButton = document.getElementById('launchButton');
  const unlaunchButton = document.getElementById('unlaunchButton');

  launchButton.disabled = isReady;
  unlaunchButton.disabled = !isReady;

  launchButton.style.opacity = isReady ? '0.5' : '1';
  unlaunchButton.style.opacity = !isReady ? '0.5' : '1';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function launchNotificare() {
  try {
    console.log('=== Launching Notificare ===');
    await Notificare.launch();

    console.log('=== Launching Notificare Finished ===');
  } catch (e) {
    console.log('=== Error launching notificare ===');
    console.log(e);

    enqueueToast('Error launching notificare.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function unlaunchNotificare() {
  try {
    console.log('=== Unlaunching Notificare ===');
    await Notificare.unlaunch();

    console.log('=== Unlaunching Notificare Finished ===');
  } catch (e) {
    console.log('=== Error unlaunching notificare ===');
    console.log(e);

    enqueueToast('Error unlaunching notificare.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function showLaunchFLowInfo() {
  const isReady = await Notificare.isReady();
  const isConfigured = await Notificare.isConfigured();

  navigator.notification.alert(
    `isReady: ${isReady}
isConfigured: ${isConfigured}`, // message
    function () {
      // Callback function logic
    }, // callback
    '', // title
    'Ok' // buttonName
  );
}
