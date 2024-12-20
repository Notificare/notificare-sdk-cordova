/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

function setupBeaconsFlag(context, flag) {
  const platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
  const projectGradlePropertiesPath = path.join(platformRoot, 'gradle.properties');

  let properties = fs.readFileSync(projectGradlePropertiesPath, {
    encoding: 'utf-8',
  });

  properties = properties.replace(/^notificareBeaconsSupportEnabled.+/m, '');
  properties += `\r\nnotificareBeaconsSupportEnabled=${flag}`;

  fs.writeFileSync(projectGradlePropertiesPath, properties);
}

module.exports.setupBeaconsFlag = setupBeaconsFlag;
