// 1. preload.js run in renderer process
// 2. so it must get app through electron.remote

const electron = require('electron')

console.log('electron', electron);
console.log('electron.remote', electron.remote);

const app = electron.remote.app;
console.log('app', app);
console.log('app path', app.getPath('exe'));
console.log('app path', app.getAppPath());

window.isDev = true;
