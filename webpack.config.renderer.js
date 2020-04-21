const path = require("path");
const ConfigUtils = require('./webpack.config.utils');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const DIR_NODE = path.join(__dirname, "node_modules");

const windows = [
    {
        dir: "render",  // путь к папкам проекта в src и distr
        entry: "index.ts",
        copy: [
            "index.html"
        ]
    }
];

const copyPath = [
    //'assets'
];
const plugins = [];

// make copy paths
windows.forEach(win => {
    if (win.copy) {
        win.copy.forEach(cPath => {
            copyPath.push(path.join(win.dir, cPath))
        })
    }
})

// build copies
plugins.push(ConfigUtils.copyPlugin(copyPath, SRC, DIST))

// build entries
const entries = {};
windows.forEach(win => {
    entries[win.dir] = path.join(win.dir, win.entry);
})


module.exports = (env, argv) => {
    return {
        context: SRC,
        entry: entries,
        mode: argv.mode || "development",
        target: "electron-renderer",
        output: {
            path: DIST,
            filename: path.join('[name]', 'index.js')
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                SRC,
                DIR_NODE
            ]
        },
        module: {
            rules: [
                {test: /\.tsx?$/, loader: "ts-loader"},
            ],
        },

        plugins: plugins,
        // watch: false,
    };
};
