/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Alpine from 'alpinejs'

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
    Alpine.data(configModule.name, () => module.default)
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

function init(config) {
    window.Alpine = Alpine
    loadModules(config).then(() => {
        document.dispatchEvent(new CustomEvent('zermatt:init'))
        Alpine.start()
    }).catch(error => {
        console.error('An error occurred:', error)
    })
}

export default {
    init: init
}

