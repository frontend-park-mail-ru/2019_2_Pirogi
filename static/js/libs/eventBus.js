

export default class EventBus {

    constructor(events = [{}]) {
        this.EventsArray = new Map();
        events.forEach((item) => {
            if (item.key === undefined) {
                return;
            }

            if (typeof item.func !== 'function' && item.func !== undefined) {
                return;
            }

            if (this.EventsArray[item.key] !== undefined) {
                return;
            }

            this.EventsArray[item.key] = item.func;
        })
    }

    addEventListener(event, func) {
        if (this.EventsArray[event] !== undefined) {
            return;
        }
        if (typeof func !== 'function' && func !== undefined) {
            return;
        }

        this.EventsArray[event] = func;
    }

    dispatchEvent(event, ...args) {
        if (this.EventsArray[event] === undefined) {
            return;
        }

        return this.EventsArray[event](...args);
    }

}