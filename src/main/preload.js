// run in renderer thread!

// use remote for GUI modules in renderer thread
const electron = require('electron')
const app = electron.remote.app;
console.log('app getAppPath', app.getAppPath());

// can access to window
window.isDev = true;

// can define constants
window.appPath = app.getAppPath();
