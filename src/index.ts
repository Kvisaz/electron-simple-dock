import {IPC_LOAD_IFRAME_CHANNEL} from './Interfaces';

const {ipcMain, BrowserWindow, app, dialog} = require('electron');
const path = require('path');

console.log('Hello from main');

const browserWindowOpts = {
    width: 1024,
    height: 600,
    show: false, // optimization
    webPreferences: {
        nodeIntegration: false,
        preload: path.join(app.getAppPath(), 'preload.js')
    }
};


app.on('ready', () => {
    const win = new BrowserWindow(browserWindowOpts);
    addStockWindowListeners(win);
    addMainWindowListeners(win);
    win.loadFile(path.join(
        'render',
        'index.html'
    )).then(() => {
        win.webContents.send(IPC_LOAD_IFRAME_CHANNEL, {
            name: 'loadIframe',
            data: path.join(app.getAppPath(), 'dock', 'index.html')
        })
    }).catch(e => {
        showErrorDialog(e);
    })
})

ipcMain.on('app-relaunch', () => {
    app.relaunch();
    app.quit();
});


app.on('before-quit', () => {
    //
})


process.on('exit', () => {
    // unlock resources, dirs, i.e
});

function addStockWindowListeners(win) {
    win.on('ready-to-show', () => {
        win.show();
    });
}

function addMainWindowListeners(win) {
    win.on('closed', () => {
        app.quit();
    });
}

function showErrorDialog(e) {
    dialog.showMessageBox(
        null,
        {
            type: 'error',
            message: `An error occurred during startup while loading...`,
            detail: e.message,
            buttons: ['Quit']
        },
        () => app.exit()
    );
}
