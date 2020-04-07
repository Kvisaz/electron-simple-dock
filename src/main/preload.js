const fs = require('fs');
const path = require('path');

// run in renderer thread!

// use remote for GUI modules in renderer thread
const electron = require('electron')
const app = electron.remote.app;
console.log('app getAppPath', app.getAppPath());

// can access to window
window.isDev = true;

// can define constants
window.appPath = app.getAppPath();
window.rendererPath = path.resolve(window.appPath, '../renderer');

const isAppPathExist = fs.existsSync(window.appPath);
const isRendererPathExist = fs.existsSync(window.rendererPath);
console.log('isAppPathExist', isAppPathExist);
console.log('isRendererPathExist', isRendererPathExist);
