import Event from '../event'
import Cookie from 'js-cookie'

/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
export default {
    fetchKey: async function () {
        const cookieValue = Cookie.get('form_key')
        Zermatt.Variables.formKey = cookieValue
        if (!cookieValue) {
            const response = await fetch(Zermatt.Variables.formKeyUrl, { method: 'POST' })
            const json = await response.json()
            Zermatt.Variables.formKey = json.form_key
            Cookie.set('form_key', json.form_key)
            Event.dispatch('zermatt:form:key:init')
        }
    }
}
