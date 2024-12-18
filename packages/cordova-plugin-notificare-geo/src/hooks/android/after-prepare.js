/* eslint-disable @typescript-eslint/no-var-requires */

const utils = require('../utils');
const { setupBeaconsFlag } = require('./setup-beacons-flag');

module.exports = function (context) {
  const appConfig = utils.getCordovaAppConfig(context);

  if (!utils.isPreferenceSet(appConfig, 'NotificareIncludeBeaconsSupport', 'android')) {
    console.log(`Notificare beacons support preference is not specified, dependency will be included by default.`);
    return;
  }

  const isPreferenceOpedIn = utils.isPreferenceOptedIn(appConfig, 'NotificareIncludeBeaconsSupport', 'android');

  setupBeaconsFlag(isPreferenceOpedIn);
};
