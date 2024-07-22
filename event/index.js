/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
const EventGroup = class {

    constructor(events, always, callback) {
        this.completedEvents = []
        this.events = events
        this.callback = callback
        this.always = always

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
        if (!this.always && this.events.length === this.completedEvents.length) {
            const completedEvents = this.completedEvents.length > 1 ? this.completedEvents : this.completedEvents[0]
            this.events.map(event => document.removeEventListener(event, this.onEvent.bind(this)))
            this.callback(completedEvents)
        }
        if (this.always) {
            const completedEvent = this.completedEvents.length > 1 ? this.completedEvents[this.completedEvents.length - 1] : this.completedEvents[0]
            this.callback(completedEvent)
        }
    }
}

const createEventGroup = function (events, callback, always) {
    const groupContainer = {}
    events = Array.isArray(events) ? events : [events]
    groupContainer.eventGroup = new EventGroup(events, always, function (completedEvents) {
        callback(completedEvents)
        delete groupContainer.eventGroup
    })
}

export default {
    once: (events, callback) => createEventGroup(events, callback, false),
    on: (events, callback) => createEventGroup(events, callback, true),
    dispatch: (event, data) => document.dispatchEvent(new CustomEvent(event, {detail: data}))
}
