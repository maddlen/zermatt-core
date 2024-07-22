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
        if (!this.completedEvents.includes(event)) {
            this.completedEvents.push(event)
        }
        this.isComplete()
    }

    isComplete() {
        if (this.events.length === this.completedEvents.length) {
            this.events.map(event => document.removeEventListener(event, this.onEvent.bind(this)))
            const completedEvents = this.completedEvents.length > 1 ? this.completedEvents : this.completedEvents[0]
            this.callback(completedEvents)
        }
    }
}

const waitFor = function (events, callback) {
    const groupContainer = {}
    events = Array.isArray(events) ? events : [events]
    groupContainer.eventGroup = new EventGroup(events, function (completedEvents) {
        callback(completedEvents)
        delete groupContainer.eventGroup
    })
}

export default {
    on: waitFor,
    dispatch: (event, data) => document.dispatchEvent(new CustomEvent(event, {detail: data}))
}
