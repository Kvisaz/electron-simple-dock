export const IPC_MESSAGE_CHANNEL = 'message';
export const IPC_LOAD_IFRAME_CHANNEL = 'load';

export const enum APP_MESSAGES {
    devTools = 'devTools',
    fullScreen = 'fullScreen',
    fullScreenOn = 'fullScreenOn',
    fullScreenOff = 'fullScreenOff',
    close = 'close',
    restart = 'restart',
    save = 'save', // запись чего-то с указанием папки и даты
    load = 'load', // загрузка чего-то с указанием папки и даты
}

export interface IPostMessage {
    name: string,
    data: any
}
