/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
export default function (moduleName, props) {
    return {
        ...(Zermatt._modules[moduleName].default),
        ...(props)
    }
}
