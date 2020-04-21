const mainConfig = require('./webpack.config.main.js')
const preloadConfig = require('./webpack.config.preload.js')
const renderConfig = require('./webpack.config.renderer.js')

module.exports = [mainConfig, preloadConfig, renderConfig]
