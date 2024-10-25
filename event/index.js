const Modes = Object.freeze({
  ON: "on",
  ONCE: "once",
  WAITON: "waitOn",
  WAITONCE: "waitOnce",
});

const Subscriber = class {
  constructor(events, mode, callback) {
    this.completedEvents = new Set();
    this.events = events;
    this.callback = callback;
    this.mode = mode;

    this.boundEventHandler = this.onEvent.bind(this);
    this.listen();
  }

  listen() {
    this.events.forEach((event) => document.addEventListener(event, this.boundEventHandler));
  }

  onEvent(domEvent) {
    this.completedEvents.add(domEvent);
    this.isComplete();
  }

  removeEventListeners(events) {
    events.forEach((event) => document.removeEventListener(event, this.boundEventHandler));
  }

  isComplete() {
    const completedEvents = Array.from(this.completedEvents);
    const allEventsCompleted = this.events.length === completedEvents.length;

    let callbackResult;
    switch (this.mode) {
      case Modes.ONCE:
        this.removeEventListeners(this.completedEvents);
        if (this.completedEvents.size === this.events.length) this.removeEventListeners(this.events);
        callbackResult = completedEvents;
        break;
      case Modes.WAITONCE:
        if (allEventsCompleted) {
          this.removeEventListeners(this.completedEvents);
          callbackResult = completedEvents;
        }
        break;
      case Modes.WAITON:
        if (allEventsCompleted) {
          callbackResult = completedEvents;
          this.completedEvents.clear();
        }
        break;
      default:
        callbackResult = completedEvents;
        this.completedEvents.clear();
        break;
    }

    if (callbackResult) this.callback(callbackResult);
  }

  off(events = []) {
    const offEvents = events.length ? events : this.events;
    this.removeEventListeners(offEvents);
    this.events = this.events.filter((event) => !offEvents.includes(event));
  }
};

const makeSubscriber = function (events, mode, callback) {
  const gc = {};
  events = Array.isArray(events) ? events : [events];
  gc.subscriber = new Subscriber(events, mode, (completedEvents) => {
    callback(completedEvents);
    delete gc.subscriber;
  });
  return gc.subscriber;
};

export default {
  dispatch: (event, data) => document.dispatchEvent(new CustomEvent(event, { detail: data })),
  on: (events, callback) => makeSubscriber(events, Modes.ON, callback),
  once: (events, callback) => makeSubscriber(events, Modes.ONCE, callback),
  waitOn: (events, callback) => makeSubscriber(events, Modes.WAITON, callback),
  waitOnce: (events, callback) => makeSubscriber(events, Modes.WAITONCE, callback),
};
