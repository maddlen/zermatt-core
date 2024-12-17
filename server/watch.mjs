import { DirTypes, files } from './paths.mjs'
import { blue } from 'colorette'
import path from 'path'
import fsp from 'fs/promises'

const PATTERN = '/**/*.js'
const filesToWatch = [...files(DirTypes.App, PATTERN), ...files(DirTypes.Theme, PATTERN)]
const signalsToWatch = ['SIGINT', 'SIGTERM']
const outputPath = path.join(process.cwd(), 'dist/.zermatt-watch')
let server, reload

const watch = () => {
    filesToWatch.forEach(file => {
        server.watcher.add(file)
    })
    server.watcher.on('change', (path) => {
        if (filesToWatch.includes(path) && reload) server.restart()
    })
    signalsToWatch.forEach(signal => {
        process.on(signal, () => {
            clearWatchFile().then(() => {
                server.close()
                process.exit()
            })
        })
    })
}

const writeWatchFile = async () => {
    const dir = path.dirname(outputPath)
    await fsp.mkdir(dir, { recursive: true })
    await fsp.writeFile(outputPath, '')
}

const clearWatchFile = async () => {
    await fsp.unlink(outputPath)
}

export default async function (viteServer, withReload = true) {
    server = viteServer
    reload = withReload
    try {
        watch()
        await writeWatchFile()
        console.log(blue('✓'), 'Watching Zermatt modules.')
    } catch (err) {
        console.error('Error watching Zermatt modules:', err)
    }
}
