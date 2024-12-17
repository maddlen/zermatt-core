import path from 'path'
import { fileURLToPath } from 'url'
import * as glob from 'glob'

const CWD = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(CWD, '../../../../../.../../../../.../../../../../')
const THEME = path.resolve(CWD, '../../../')

export const DirTypes = {
    Vendor: 'vendor',
    App: 'app',
    Theme: 'theme'
}

export const dirs = {
    [DirTypes.Vendor]: path.resolve(ROOT + '/vendor/*/*/view/frontend/web/zermatt'),
    [DirTypes.App]: path.resolve(ROOT + '/app/code/*/*/view/frontend/web/zermatt'),
    [DirTypes.Theme]: path.resolve(THEME)
}

export const files = function (code, patten) {
    return [...glob.sync(dirs[code] + patten).filter(file => !file.includes('node_modules') && !file.includes('vite.config.js'))]
}
