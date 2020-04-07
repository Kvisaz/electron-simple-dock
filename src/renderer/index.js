
console.log('Renderer say Hello')
console.log(`constants from preloader`, window.isDev);
console.log(`appPathe from preloader`, window.appPath);
console.log(`rendererPath from preloader`, window.rendererPath);


import {ClientIPC as IPC} from './client-ipc';

let output = document.querySelector('#output')

document.querySelector('#factorial').addEventListener('click', async () => {
    let result = await IPC.send('make-factorial', {num: 5})
    output.innerHTML = result
})

document.querySelector('#call').addEventListener('click', async () => {
    let result = await IPC.send('ring-ring', {message: 'this is james'})
    output.innerHTML = result
})
