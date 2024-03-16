/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */

const translate = function (message) {
    console.log(message)
}

$t = window.$t = translate

export default {
    sprintf(format) {
        const args = Array.prototype.slice.call(arguments, 1)
        let i = 0
        return format.replace(/%s/g, function () {
            return args[i++]
        })
    },
    
    $t: translate
}
