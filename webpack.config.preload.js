const path = require("path");
const ConfigUtils = require('./webpack.config.utils');


const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");
const DIR_NODE = path.join(__dirname, "node_modules");

const entries = {
    'preload': path.join(SRC, 'preload.ts'),
};

const copyPaths = [
    //'preload.js'
];

module.exports = (env, argv) => {
    return {
        context: SRC,
        entry: entries,
        mode: argv.mode || "development",
        target: "electron-renderer",
        output: {
            path: DIST,
            filename: `[name].js`
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                SRC,
                DIR_NODE
            ]
        },
        plugins: [
            ConfigUtils.copyPlugin(copyPaths, SRC, DIST)
        ],
        module: {
            rules: [
                {test: /\.tsx?$/, loader: "ts-loader"},
            ],
        }
    };
};
