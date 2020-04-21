import {APP_MESSAGES, IPC_LOAD_IFRAME_CHANNEL, IPC_MESSAGE_CHANNEL, IPostMessage} from './Interfaces';

const Mousetrap = require('mousetrap');

import {remote, ipcRenderer} from 'electron';

const WINDOW_ID = remote.getCurrentWindow().id;

console.log('Hello from preload.TS ..');
console.log('preload window id ', WINDOW_ID);

let iframeWin: Window; //


ipcRenderer.once(IPC_LOAD_IFRAME_CHANNEL, (event, messageData: IPostMessage) => {
    const iframePath: string = messageData.data;
    console.log('load iframe from...', iframePath);
    const SELECTOR = '#dock';

    const iframeEl: HTMLIFrameElement = document.querySelector(SELECTOR);
    if (iframeEl) {
        iframeEl.onload = () => {
            iframeWin = iframeEl.contentWindow;
            console.log('preload:: iframe loaded from - ', iframePath);
            console.log('preload:: iframeWin - ', iframeWin);
            iframeWin.postMessage({
                name: 'init',
                data: 'initData'
            }, '*')
        }
        iframeEl.src = iframePath;
    } else {
        console.warn(`Cannot find iframe dock for selector [${SELECTOR}]`);
    }
})

ipcRenderer.on(IPC_MESSAGE_CHANNEL, (event, messageData: IPostMessage) => {
    iframeWin.postMessage(messageData, '*');
})

window.addEventListener('message', e => {
    const postMessage: IPostMessage = e.data;
    console.log('get message from iframe ->', postMessage);

    switch (postMessage.name) {
        case APP_MESSAGES.fullScreen:
            fullScreen(!isFullscreen())
            break;
        case APP_MESSAGES.devTools:
            win().webContents.toggleDevTools()
            break;
        default:
            ipcRenderer.send(IPC_MESSAGE_CHANNEL, postMessage);
    }
})

function win() {
    return remote.getCurrentWindow();
}

function isFullscreen() {
    return win().isFullScreen();
}

function fullScreen(full = true) {
    win().setFullScreen(full);
}
