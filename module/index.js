/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */

async function loadModule(configModule) {
    let importModule = await import(configModule.path)
    return {
        name: configModule.name,
        default: importModule.default
    }
}

function loadModules(modules) {
    const promises = modules.map(configModule => loadModule(configModule))
    return Promise.all(promises)
}

export default {
    loadAll: loadModules
}
