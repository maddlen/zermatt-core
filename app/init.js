/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'
import Module from './../module'
import Translation from './translation'
import Alpine from "alpinejs"

let config = {}

const listen = function () {
    Event.listen('zermatt:kick', () => Translation.init())
    Event.listen('zermatt:translation:init', () => Module.init(config))
    Event.waitFor(['zermatt:translation:init', 'zermatt:module:init'], () => {
        Event.dispatch('zermatt:init')
        Alpine.start()
    })
}

const init = function (Config) {
    config = Config
    window.Alpine = Alpine
    listen()
    Event.dispatch('zermatt:kick')
}

export default init
