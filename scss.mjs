import path from 'path'
import fsp from 'fs/promises'
import * as glob from 'glob'
import { fileURLToPath } from 'url'
import { blue } from 'colorette'

const CWD = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(CWD, '../../../../.../../../../.../../../../../')
const THEME = path.resolve(CWD, '../../')

const sourceFiles = {
    vendor: buildObjectFromPaths([...glob.sync(path.resolve(ROOT + '/vendor/*/*/view/frontend/web/zermatt/**/*.scss'))]),
    app: buildObjectFromPaths([...glob.sync(path.resolve(ROOT + '/app/code/*/*/view/frontend/web/zermatt/**/*.scss'))]),
    theme: buildObjectFromPaths([...glob.sync(path.resolve(THEME + '/**/*.scss'))])
}

const inheritanceFiles = Object.values(sourceFiles).reduce((acc, curr) => {
    for (const [key, value] of Object.entries(curr)) {
        acc[key] = value
    }
    return acc
}, {})
const scssFiles = Object.values(inheritanceFiles)

async function createZermattLock (files) {
    const outputPath = path.join(process.cwd(), 'dist/zermatt-lock.scss')
    let scssContent = files.length ? '' : '.fake-class-to-avoid-issues {display: none}\n'

    files.forEach(file => {
        const formattedFilePath = path.normalize(file).replace(/\\/g, '/') // Normalize file path
        scssContent += formattedFilePath.includes('zermatt-lock') ? '' : `@use '${formattedFilePath}';\n`
    })

    try {
        const dir = path.dirname(outputPath)
        await fsp.mkdir(dir, { recursive: true })
        await fsp.writeFile(outputPath, scssContent, 'utf8')
        console.log(blue('✓'), 'zermatt-lock.scss')
    } catch (err) {
        console.error('Error writing the zermatt-lock.scss file:', err)
    }
}

function buildObjectFromPaths (paths) {
    const formatPropertyName = (name) => name.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^[^a-zA-Z_]/, '_').replace(/_+/g, '_').trim()
    return paths.reduce((result, path) => {
        const fileName = path.split('/').pop().replace('.scss', '')
        const validName = formatPropertyName(fileName)
        if (validName) result[validName] = path
        return result
    }, {})
}

export default async function zermattLock (files = null) {
    return await createZermattLock(files || scssFiles);
}
