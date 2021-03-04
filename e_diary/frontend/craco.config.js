//import * as fs from "fs"; fs - file system
const fs = require("fs") 

const path = require("path") 

const devOutputPath = path.resolve(fs.realpathSync(process.cwd()), "../students")

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //key for configuration
    devServer: (devServerConfig) => {
        devServerConfig.writeToDisk = true
        return devServerConfig
    },
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            webpackConfig.output.path = env === "production"
                ? paths.appBuild
                : devOutputPath
            return webpackConfig
        },
        plugins:[new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve(fs.realpathSync(process.cwd()), "./public/index.html"),
                filename: devOutputPath + "/templates/students/index.html"
            })]
    }
}