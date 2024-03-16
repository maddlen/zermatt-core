/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event'
const init = function() {
    console.log('init translation')
    Event.dispatch('zermatt:translation:init')
}

export default {
    init: init
} 
