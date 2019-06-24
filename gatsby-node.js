const fs = require('fs');
const path = require('path');

const writeFile = (name, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, content, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

const OneSignalSDKUpdaterWorker = `importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');`;

const OneSignalSDKWorker = `importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');`;

const defaultNames = {
  mainServiceWorkerName: 'OneSignalSDKWorker',
  updateServiceWorkerName: 'OneSignalSDKUpdaterWorker',
};

const distDir = (dir, name) => {
  return path.join(dir, `public`, name);
};

exports.onPostBuild = async ({ store }, pluginOptions) => {
  const { program } = store.getState();

  if (pluginOptions.mainServiceWorkerName) {
    defaultNames.mainServiceWorkerName = pluginOptions.mainServiceWorkerName;
  }

  if (pluginOptions.updateServiceWorkerName) {
    defaultNames.updateServiceWorkerName =
      pluginOptions.updateServiceWorkerName;
  }
  await writeFile(
    distDir(program.directory, `${defaultNames.mainServiceWorkerName}.js`),
    OneSignalSDKWorker,
  );
  await writeFile(
    distDir(program.directory, `${defaultNames.updateServiceWorkerName}.js`),
    OneSignalSDKUpdaterWorker,
  );
};
