/* eslint-disable @typescript-eslint/no-var-requires */

const FS = require('fs');
const Path = require('path');

function setupBeaconsFlag(flag) {
  const propertiesPath = Path.resolve(process.cwd(), 'platforms/android/gradle.properties');

  let properties = FS.readFileSync(propertiesPath, {
    encoding: 'utf-8',
  });

  properties = properties.replace(/^includeBeaconsSupport.+/m, '');
  properties += `\r\nincludeBeaconsSupport=${flag}`;

  FS.writeFileSync(propertiesPath, properties);
}

module.exports.setupBeaconsFlag = setupBeaconsFlag;
