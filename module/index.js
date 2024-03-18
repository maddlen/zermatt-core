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
    Alpine.data(configModule.name, () => module.default)
    return {
        name: configModule.name,
        default: module.default
    }
}

function loadModules(config) {
    zermattConfig = config
    const promises = zermattConfig.modules.map(configModule => {
        const matchingDomElement = document.querySelector(['[x-data="' + configModule.name + '"]'])
        return matchingDomElement ? loadModule(configModule) : null
    })
    return Promise.all(promises)
}

function init(config) {
    loadModules(config).then(() => {
        Event.dispatch('zermatt:module:init')
    }).catch(error => {
        console.error('Error while loading modules:', error)
    })
}

export default {
    init: init
}

