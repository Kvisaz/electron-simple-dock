import {ClientIPC as IPC} from './client-ipc';

window.addEventListener('load', ()=>{
    IPC.init()
        .then(()=> console.log('IPC initialized...'))
})

let output = document.querySelector('#output')

document.querySelector('#factorial').addEventListener('click', async () => {
    let result = await IPC.send('make-factorial', {num: 5})
    output.innerHTML = result
})

document.querySelector('#call').addEventListener('click', async () => {
    let result = await IPC.send('ring-ring', {message: 'this is james'})
    output.innerHTML = result
})
