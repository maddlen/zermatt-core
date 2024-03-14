/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Money from './money'
import String from './string'
import Url from './url'

const Zermatt = {
    Money: Money,
    String: String,
    Url: Url
}

window.Zermatt = window.Zermatt || Zermatt
export default Zermatt
