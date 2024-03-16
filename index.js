/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './event'
import Init from './app/init'
import Module from './module'
import Money from './money'
import String from './string'
import Url from './url'

const Zermatt = {
    ...window.Zermatt,
    
    Event: Event,
    init: Init,
    Module: Module,
    Money: Money,
    String: String,
    Url: Url
}

window.Zermatt = Zermatt

export default Zermatt
