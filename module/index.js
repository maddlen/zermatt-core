/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'

let zermattConfig = {}

async function rewrite(module, configModule) {
    const rewrite = zermattConfig.rewrites?.find(rewrite => rewrite.name === configModule.name)
    if (rewrite) {
        const importRewrite = await import(/* @vite-ignore */Zermatt.Variables.viewUrl + rewrite.path + '.js')
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
    let module = await import(/* @vite-ignore */Zermatt.Variables.viewUrl + configModule.path + '.js')
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
    let hasModule = false

    if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Zermatt.Module(\'') > -1) {
        hasModule = true
    }
    
    if (document.querySelector(['[x-data^="Zermatt.Module(\'' + moduleName])) {
        hasModule = true
    }
    
    return hasModule
}

export default {
    init: init
}

