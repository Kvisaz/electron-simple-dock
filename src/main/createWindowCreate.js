import {app, BrowserWindow} from "electron";
import {format as formatUrl} from "url";
import path from "path";

const isDev = require('electron-is-dev')

export function loadWindowUrl(window, relativePath) {
    if (isDev) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/${relativePath}`)
    } else {
        window.loadURL(formatUrl({
            pathname: path.resolve(__dirname, relativePath),
            protocol: 'file',
            slashes: true
        }))
    }
}

export function createMainWindow(onClosed) {
    const window = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(app.getAppPath(), 'client-preload.js')
            }
        }
    )

    if (isDev) {
        window.webContents.openDevTools()
    }

    loadWindowUrl(window, 'index.html');

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
