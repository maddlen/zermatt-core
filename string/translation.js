/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'
import i18next from 'i18next'

let dict = {}

const interpolate = function () {
    for (var key in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
            dict[key] = dict[key].replace(/%(\d+)/g, '{{$1}}')
        }
    }
}

const i18nextInit = function () {
    i18next.init({
        lng: Zermatt.Variables.locale,
        debug: false,
        resources: {
            [Zermatt.Variables.locale]: {
                translation: dict
            }
        }
    })
}

const init = function () {
    fetch(Zermatt.Variables.translationUrl).then(res => res.json()).then(json => {
        dict = json
        interpolate()
        i18nextInit()
        Event.dispatch('zermatt:translation:init')
    })
}

const translate = function (message, ...vars) {
    let args = {}
    vars.map((v, i) => args[i + 1] = v)
    return i18next.t(message, args);
}

$t = window.$t = translate

export default {
    init: init,
    translate: translate
}
