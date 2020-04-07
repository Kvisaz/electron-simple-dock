import {serverHandlers} from './server/server-handlers';
import {ServerIPC} from './server/server-ipc';

const IPC = ServerIPC;

let isDev, version

if (process.argv[2] === '--subprocess') {
  isDev = false
  version = process.argv[3]

  let socketName = process.argv[4]
  IPC.init(socketName, serverHandlers)
} else {
  let { ipcRenderer, remote } = require('electron')
  isDev = true
  version = remote.app.getVersion()

  ipcRenderer.on('set-socket', (event, { name }) => {
    IPC.init(name, serverHandlers)
  })
}

console.log(version, isDev)
