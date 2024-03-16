/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Module from './module'
import Money from './money'
import String from './string'
import Url from './url'

const Zermatt = {
    ...window.Zermatt,
    
    init: Module.init,
    Module: Module,
    Money: Money,
    String: String,
    Url: Url
}

window.Zermatt = Zermatt

export default Zermatt
