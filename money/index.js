/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
export default {
    // Copied from /vendor/magento/module-catalog/view/base/web/js/price-utils.js
    // because we do not want to depend on requireJS
    formatPrice(amount, format, isShowSign) {
        const stringPad = function (string, times) {
            return (new Array(times + 1)).join(string)
        }
        let globalPriceFormat = {
            requiredPrecision: 2,
            integerRequired: 1,
            decimalSymbol: ',',
            groupSymbol: ',',
            groupLength: ','
        }
        let s = '',
            precision, integerRequired, decimalSymbol, groupSymbol, groupLength, pattern, i, pad, j, re, r, am

        format = Object.assign(globalPriceFormat, format)

        precision = isNaN(format.requiredPrecision = Math.abs(format.requiredPrecision)) ? 2 : format.requiredPrecision
        integerRequired = isNaN(format.integerRequired = Math.abs(format.integerRequired)) ? 1 : format.integerRequired
        decimalSymbol = format.decimalSymbol === undefined ? ',' : format.decimalSymbol
        groupSymbol = format.groupSymbol === undefined ? '.' : format.groupSymbol
        groupLength = format.groupLength === undefined ? 3 : format.groupLength
        pattern = format.pattern || '%s'

        if (isShowSign === undefined || isShowSign === true) {
            s = amount < 0 ? '-' : isShowSign ? '+' : ''
        } else if (isShowSign === false) {
            s = ''
        }
        pattern = pattern.indexOf('{sign}') < 0 ? s + pattern : pattern.replace('{sign}', s)

        i = parseInt(
            amount = Number(Math.round(Math.abs(+amount || 0) + 'e+' + precision) + ('e-' + precision)),
            10
        ) + ''
        pad = i.length < integerRequired ? integerRequired - i.length : 0
        i = stringPad('0', pad) + i
        j = i.length > groupLength ? i.length % groupLength : 0
        re = new RegExp('(\\d{' + groupLength + '})(?=\\d)', 'g')
        am = Number(Math.round(Math.abs(amount - i) + 'e+' + precision) + ('e-' + precision))
        r = (j ? i.substr(0, j) + groupSymbol : '') +
            i.substr(j).replace(re, '$1' + groupSymbol) +
            (precision ? decimalSymbol + am.toFixed(precision).replace(/-/, 0).slice(2) : '')
        return pattern.replace('%s', r).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
    }
}
