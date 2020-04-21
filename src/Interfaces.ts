export const IPC_MESSAGE_CHANNEL = 'message';
export const IPC_LOAD_IFRAME_CHANNEL = 'load';

export interface IPostMessage {
    name: string,
    data: any
}
