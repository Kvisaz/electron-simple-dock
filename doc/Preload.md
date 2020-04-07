# Preload

Скрипт `preload.js` запускается (может запускаться) перед запуском окна. Он может иметь доступ к `node` и `window`

Чтобы получить доступ к модулям, которые не доступны в графическом процессе, вроде `electron.app` - надо использовать electron.remote  Пример:
```js
const electron = require('electron')
const app = electron.remote.app;
console.log('app getAppPath', app.getAppPath());
```
