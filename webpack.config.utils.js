const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    copyPlugin: copyPlugin,
}

function copyPath(cPath, srcDir, outDir) {
    return {
        from: path.join(srcDir, cPath),
        to: path.join(outDir, cPath)
    }
}

function copyPlugin(cPaths, srcDir, outDir) {
    if (cPaths == null) return [];
    else return new CopyPlugin(cPaths.map(cPath => copyPath(cPath, srcDir, outDir)));
}
