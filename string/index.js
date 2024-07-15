/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Translation from './translation'

export default {
    sprintf(format) {
        const args = Array.prototype.slice.call(arguments, 1)
        let i = 0
        return format.replace(/%s/g, function () {
            return args[i++]
        })
    },
    
    translate: Translation.translate
}
