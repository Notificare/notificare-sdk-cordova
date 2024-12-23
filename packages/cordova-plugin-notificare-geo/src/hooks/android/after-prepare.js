/* eslint-disable @typescript-eslint/no-var-requires */

const utils = require('cordova-plugin-notificare/src/hooks/utils');
const { setupBeaconsFlag } = require('./setup-beacons-flag');

module.exports = function (context) {
  const appConfig = utils.getCordovaAppConfig(context);

  if (!utils.isPreferenceSet(appConfig, 'NotificareBeaconsSupportEnabled', 'android')) {
    console.log(`Notificare beacons support preference is not specified, dependency will be included by default.`);
    return;
  }

  const isPreferenceOptedIn = utils.isPreferenceOptedIn(appConfig, 'NotificareBeaconsSupportEnabled', 'android');

  setupBeaconsFlag(context, isPreferenceOptedIn);
};
