/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */

let zermattConfig = {}

async function rewrite(module, configModule) {
    const rewrite = zermattConfig.rewrites?.find(rewrite => rewrite.name === configModule.name)
    if (rewrite) {
        const importRewrite = await import(rewrite.path)
        return {
            default: {
                ...(module.default),
                ...(importRewrite.default)
            }
        }
    } else {
        return module
    }
}

async function loadModule(configModule) {
    let module = await import(configModule.path)
    module = await rewrite(module, configModule)
    return {
        name: configModule.name,
        default: module.default
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

