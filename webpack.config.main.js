console.log('webpack COMMON reporting.....');

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'src/main/server-dev.html'),
                to: path.resolve(__dirname, 'dist/server-dev.html')
            }
        ])
    ]
}
