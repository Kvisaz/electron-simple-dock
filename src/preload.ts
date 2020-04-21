import {IPC_LOAD_IFRAME_CHANNEL, IPC_MESSAGE_CHANNEL, IPostMessage} from './Interfaces';

const {remote, ipcRenderer} = require('electron')
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
    const postMessage = e.data;
    ipcRenderer.send(IPC_MESSAGE_CHANNEL, postMessage);
})
