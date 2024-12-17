import path from 'path'
import fsp from 'fs/promises'
import { blue } from 'colorette'
import { DirTypes, files} from './paths.mjs'

const PATTERN = '/**/*.scss'

const sourceFiles = {
    vendor: buildObjectFromPaths(files(DirTypes.Vendor, PATTERN)),
    app: buildObjectFromPaths(files(DirTypes.App, PATTERN)),
    theme: buildObjectFromPaths(files(DirTypes.Theme, PATTERN)),
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
        console.log(blue('✓'), 'Built zermatt-lock.scss.')
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
