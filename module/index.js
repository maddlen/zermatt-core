/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Alpine from 'alpinejs'
import Event from './../event'

let zermattConfig = {}

async function rewrite(module, configModule) {
    const rewrite = zermattConfig.rewrites?.find(rewrite => rewrite.name === configModule.name)
    if (rewrite) {
        const importRewrite = await import(Zermatt.Variables.viewUrl + rewrite.path + '.js')
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
    let module = await import(Zermatt.Variables.viewUrl + configModule.path + '.js')
    module = await rewrite(module, configModule)
    Zermatt._modules[configModule.name] = module
}

function loadModules(config) {
    zermattConfig = config
    const promises = zermattConfig.modules.map(configModule => {
        return pageHasModule(configModule.name) ? loadModule(configModule) : true
    })
    return Promise.all(promises)
}

function init(config) {
    Zermatt._modules = {}
    loadModules(config).then(() => {
        Event.dispatch('zermatt:module:init')
    }).catch(error => {
        console.error('Error while loading modules:', error)
    })
}

export function pageHasModule(moduleName) {
    return document.querySelector(['[x-data^="Zermatt.Module(\'' + moduleName])
}

export default {
    init: init
}

