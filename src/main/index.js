'use strict'

import {app, BrowserWindow} from 'electron'
import {createMainWindow} from './createWindowCreate';
import {findOpenSocket} from './server/find-open-socket';

let isDev = require('electron-is-dev')

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
let serverWin
let serverProcess
let serverSocket

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// on macOS it is common to re-create a window even
// after all windows have been closed
app.on('activate', () => {
    if (mainWindow === null) createClientWindow();
})

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
    const socketName = await findOpenSocket();
    createClientWindow(socketName);
    if (isDev) {
        createBackgroundWindow(serverSocket)
    } else {
        createBackgroundProcess(serverSocket)
    }
})

app.on('before-quit', () => {
    if (serverProcess) {
        serverProcess.kill()
        serverProcess = null
    }
})

/***************
 *  FUNCTIONS
 ***************/

function createClientWindow(socketName) {
    mainWindow = createMainWindow(
        () => {
            mainWindow = null;
        }
    )

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('set-socket', {
            name: socketName
        })
    })

}

function createBackgroundWindow(socketName) {
    const win = new BrowserWindow({
        x: 500,
        y: 300,
        width: 700,
        height: 500,
        show: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    loadWindowUrl(win, 'server-dev.html');

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('set-socket', {name: socketName})
    })

    serverWin = win
}

function createBackgroundProcess(socketName) {
    serverProcess = fork(__dirname + 'server.js', [
        '--subprocess',
        app.getVersion(),
        socketName
    ])

    serverProcess.on('message', msg => {
        console.log(msg)
    })
}

