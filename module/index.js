/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */

let zermattConfig = {}

async function loadModule(configModule) {
    let importModule = await import(configModule.path)
    const rewrite = zermattConfig.rewrites.find(rewrite => rewrite.name === configModule.name)
    if (rewrite) {
        const importRewrite = await import(rewrite.path)
        const moduleDefault = importModule.default
        const rewriteDefault = importRewrite.default
        importModule = {
            default: {
                ...moduleDefault,
                ...rewriteDefault
            }
        }
    }
    return {
        name: configModule.name,
        default: importModule.default
    }
}

function loadModules(config) {
    zermattConfig = config
    const promises = zermattConfig.modules.map(configModule => loadModule(configModule))
    return Promise.all(promises)
}

export default {
    loadAll: loadModules
}

