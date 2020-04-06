'use strict'

import {app} from 'electron'
import {createMainWindow} from './simpleWindowCreate';


// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

const createWindow = () => {
    mainWindow = createMainWindow(
        () => {
            mainWindow = null;
        }
    )
}

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
    if (mainWindow === null) createWindow();
})

// create main BrowserWindow when electron is ready
app.on('ready', () => createWindow())
