import Event from 'zermatt-core/event'
import { pageHasModule } from 'zermatt-core/module'

/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
export default {
    fetch: async function () {
        if (!pageHasModule('Zermatt_Form')) return true

        const response = await fetch(Zermatt.Variables.formKeyUrl, { method: 'POST' })
        const json = await response.json()
        Zermatt.Variables.formKey = json.form_key
        Event.dispatch('zermatt:form:key:init')
    }
}
