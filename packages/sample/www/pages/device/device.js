document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', handleBackButton, false);

async function onDeviceReady() {
  await getDeviceData();
  await getUserData();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getDeviceData() {
  const deviceDataContainer = document.getElementById('deviceData');
  deviceDataContainer.innerHTML = '';

  try {
    const currentDevice = await Notificare.device().getCurrentDevice();
    if (currentDevice == null) {
      return;
    }

    const preferredLanguage = await Notificare.device().getPreferredLanguage();
    const currentDeviceData = {};

    console.log('=== Fetched device and language data successfully ===');
    enqueueToast('Fetched device and language data successfully.', 'success');

    currentDeviceData.ID = currentDevice.id;
    currentDeviceData['User Name'] = currentDevice.userName ?? '-';
    currentDeviceData.Registered = currentDevice.lastRegistered;
    currentDeviceData.DnD = currentDevice.dnd != null ? `${currentDevice.dnd.start} : ${currentDevice.dnd.end}` : '-';
    currentDeviceData.Region = currentDevice.region;
    currentDeviceData.Language = currentDevice.language;
    currentDeviceData['Preferred Language'] = preferredLanguage ?? '-';
    currentDeviceData.Transport = currentDevice.transport;
    currentDeviceData['OS Version'] = currentDevice.osVersion;
    currentDeviceData['SDK Version'] = currentDevice.sdkVersion;

    const keys = Object.keys(currentDeviceData);
    const lastKey = keys[keys.length - 1];

    for (const key of keys) {
      if (currentDeviceData.hasOwnProperty(key)) {
        const value = currentDeviceData[key];

        const dataView = `
              <div class="data-row">
                <span class="data-label">${key}</span>
                <span class="data-text">${value}</span>
              </div>
            `;

        deviceDataContainer.innerHTML += dataView;

        if (key !== lastKey) {
          const divider = '<div class="divider-horizontal"></div>';
          deviceDataContainer.innerHTML += divider;
        }
      }
    }
  } catch (e) {
    console.log('=== Error getting device or language data data ===');
    console.log(e);

    enqueueToast('Error getting device or language data data.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getUserData() {
  const userDataContainer = document.getElementById('userData');
  userDataContainer.innerHTML = '';

  try {
    const userData = await Notificare.device().fetchUserData();

    console.log('=== Fetched user data successfully ===');
    enqueueToast('Fetched user data successfully.', 'success');

    const keys = Object.keys(userData);
    const lastKey = keys[keys.length - 1];

    if (keys.length > 0) {
      for (const key of keys) {
        if (userData.hasOwnProperty(key)) {
          const value = userData[key];

          const dataView = `
              <div class="data-row">
                <span class="data-label">${key}</span>
                <span class="data-text">${value}</span>
              </div>
            `;

          userDataContainer.innerHTML += dataView;

          if (key !== lastKey) {
            const divider = '<div class="divider-horizontal"></div>';
            userDataContainer.innerHTML += divider;
          }
        }
      }
    } else {
      userDataContainer.innerHTML = `
          <div class="data-row"> 
            <span class="data-label">
            No Data
            </span>
            <span class="data-text">
            </span>
          </div>`;
    }
  } catch (e) {
    console.log('=== Error fetching user data ===');
    console.log(e);

    enqueueToast('Error fetching user data.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function registerDeviceWithUser() {
  try {
    await Notificare.device().register('helder@notifica.re', 'Helder Pinhal');

    console.log('=== Registered device with user successfully ===');
    enqueueToast('Registered device with user successfully.', 'success');

    await getDeviceData();
  } catch (e) {
    console.log('=== Error registering device with user ===');
    console.log(e);

    enqueueToast('Error registering device with user.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function registerDeviceAsAnonymous() {
  try {
    await Notificare.device().register(null, null);

    console.log('=== Registered device as anonymous successfully ===');
    enqueueToast('Registered device as anonymous successfully.', 'success');

    await getDeviceData();
  } catch (e) {
    console.log('=== Error registering device as anonymous ===');
    console.log(e);

    enqueueToast('Error registering device as anonymous.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updatePreferredLanguage() {
  try {
    await Notificare.device().updatePreferredLanguage('nl-NL');

    console.log('=== Updated preferred language successfully ===');
    enqueueToast('Updated preferred language successfully.', 'success');

    await getDeviceData();
  } catch (e) {
    console.log('=== Error updating preferred language ===');
    console.log(e);

    enqueueToast('Error updating preferred language.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function clearPreferredLanguage() {
  try {
    await Notificare.device().updatePreferredLanguage(null);

    console.log('=== Cleared preferred language successfully ===');
    enqueueToast('Cleared preferred language successfully', 'success');

    await getDeviceData();
  } catch (e) {
    console.log('=== Error cleaning preferred language ===');
    console.log(e);

    enqueueToast('Error cleaning preferred language.', 'error');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateUserData() {
  try {
    await Notificare.device().updateUserData({
      firstName: 'Helder',
      lastName: 'Pinhal',
    });

    console.log('=== Updated user data successfully ===');
    enqueueToast('Updated user data successfully.', 'success');

    await getUserData();
  } catch (e) {
    console.log('=== Error updating user data ===');
    console.log(e);

    enqueueToast('Error updating user data.', 'error');
  }
}

function handleBackButton() {
  window.location.replace('../home/home.html');
}
