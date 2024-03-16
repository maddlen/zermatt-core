/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
const EventGroup = class {

    constructor(events, callback) {
        this.completedEvents = []
        this.events = events
        this.callback = callback

        this.listen()
    }

    listen() {
        this.events.map(event => document.addEventListener(event, this.onEvent.bind(this)))
    }

    onEvent(event) {
        this.completedEvents.push(event)
        this.isComplete()
    }

    isComplete() {
        if (this.events.length === this.completedEvents.length) {
            this.callback(this.completedEvents)
        }
    }
}

const waitFor = function (events, callback) {
    const groupContainer = {}
    groupContainer.eventGroup = new EventGroup(events, function (completedEvents) {
        callback(completedEvents)
        delete groupContainer.eventGroup
    })
}

export default {
    listen: (event, callback) => document.addEventListener(event, callback),
    dispatch: (event, data) => document.dispatchEvent(new CustomEvent(event, data)),
    waitFor: waitFor
}
