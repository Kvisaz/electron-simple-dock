#Config Webpack

electron-webpack хранит настройки у себя в директории. Можно добавить свои

## Как добавить свои настройки

В настройках [electronWebpack](ConfigElectronWebpack.md)

```json {
"renderer": {
      "webpackConfig": "webpack.renderer.additions.js"
    }
}
```

В указанном файле можно писать свои настройки.


##Configuration Files

- `electron-webpack/webpack.main.config.js` (main process)
- `electron-webpack/webpack.renderer.config.js` (renderer process)
- `electron-webpack/webpack.renderer.dll.config.js` (Dll bundle splitting)
