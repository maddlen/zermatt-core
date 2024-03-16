/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'

dict = {}

const init = function () {
    fetch(Zermatt.Variables.translationUrl).then(res => res.json()).then(json => {
        dict = json
        Event.dispatch('zermatt:translation:init')
    })
}

const translate = function (message) {
    return dict[message]
}

$t = window.$t = translate

export default {
    init: init,
    translate: translate
}
