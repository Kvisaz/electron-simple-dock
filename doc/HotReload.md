## Hot reload

https://webpack.electron.build/development

Webpack HMR has been setup to support both the renderer and main process. This allows for faster development ensuring your application is only restarted when necessary. All you need to do is accept hot updates in your entry files:

```
// in main/index.js, renderer/index.js or in both
if (module.hot) {
  module.hot.accept();
}
```
