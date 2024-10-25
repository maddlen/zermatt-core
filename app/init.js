/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'
import FormKey from './../form/key'
import Module from './../module'
import Translation from './../string/translation'
import Alpine from "alpinejs"
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'
import morph from '@alpinejs/morph'
import persist from '@alpinejs/persist'
import precognition from "laravel-precognition-alpine"
import { client } from 'laravel-precognition-alpine';

// For Magento to parse JSON payload to the request params. Otherwide $request->getParams() is empty.
client.axios().defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let config = {}

const listen = function () {
    Event.waitOnce('zermatt:kickoff', () => {
        Translation.init()
        FormKey.fetch()
    })
    Event.waitOnce('zermatt:translation:init', () => Module.init(config))
    Event.waitOnce(['zermatt:translation:init', 'zermatt:module:init'], () => {
        Event.dispatch('zermatt:init')
        Alpine.start()
        Event.dispatch('zermatt:ready')
    })
}

const init = function (Config) {
    config = Config
    window.Alpine = Alpine
    Alpine.plugin([collapse, focus, morph, persist, precognition])
    listen()
    Event.dispatch('zermatt:kickoff')
}

export default init
