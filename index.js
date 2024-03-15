/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Module from './module'
import Money from './money'
import String from './string'
import Url from './url'

const Zermatt = {
    ...window.Zermatt,
    
    Module: Module,
    Money: Money,
    String: String,
    Url: Url
}

export default Zermatt
