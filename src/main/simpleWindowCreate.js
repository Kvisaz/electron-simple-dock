import {app, BrowserWindow} from "electron";
import {format as formatUrl} from "url";
import path from "path";

const isDev = require('electron-is-dev')

export function createMainWindow(onClosed) {
    const window = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(app.getAppPath(), 'preload.js')
            }
        }
    )

    if (isDev) {
        window.webContents.openDevTools()
    }

    if (isDev) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    } else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }

    window.on('closed', () => {
        if (onClosed) onClosed();
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    return window
}
