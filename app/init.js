/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'
import Module from './../module'
import Translation from './../string/translation'
import Alpine from "alpinejs"

let config = {}

const listen = function () {
    Event.listen('zermatt:kickoff', () => Translation.init())
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
    Event.dispatch('zermatt:kickoff')
}

export default init
