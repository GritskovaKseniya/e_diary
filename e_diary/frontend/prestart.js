const path = require("path")

const fs = require("fs-extra")

const paths = require("react-scripts/config/paths")

const outputPath = path.resolve(fs.realpathSync(process.cwd()), "../students")

//remove files in directories
fs.emptyDirSync(outputPath + "/assets")
fs.emptyDirSync(outputPath + "/static")
//remove file
fs.removeSync(outputPath + "/asset-manifest.json")
fs.removeSync(outputPath + "/index.html")
// remove hot-updates files
fs.readdirSync(outputPath)
    .filter(filename => /(.*)\.hot-update\.(.*)/.test(filename))
    .forEach(filename => {
        fs.removeSync(`${outputPath}/${filename}`)
    })
