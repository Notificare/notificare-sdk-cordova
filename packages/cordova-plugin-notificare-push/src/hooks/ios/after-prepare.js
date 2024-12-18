/* eslint-disable @typescript-eslint/no-var-requires */

const utils = require('cordova-plugin-notificare/src/hooks/utils');
const { setupPlistSettings } = require('./setup-plist-settings');
const { setupServiceExtension } = require('./setup-notification-service-extension');

module.exports = function (context) {
  const appConfig = utils.getCordovaAppConfig(context);

  if (!utils.isPreferenceOptedIn(appConfig, 'NotificareNotificationServiceExtensionEnabled', 'ios')) {
    console.log(`Notificare notifications service extension not opted-in, skipping.`);
    return;
  }

  setupServiceExtension(context, appConfig);
  setupPlistSettings(appConfig);
};
