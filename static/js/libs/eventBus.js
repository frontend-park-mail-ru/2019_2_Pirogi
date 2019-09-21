export default class EventBus {
    constructor(events = [{}]) {
        this.eventsMap = new Map();
        events.forEach((item) => {
            if (item.key === undefined) {
                return;
            }

            if (typeof item.func !== 'function' && item.func !== undefined) {
                return;
            }

            if (this.eventsMap[item.key] !== undefined) {
                return;
            }

            this.eventsMap[item.key] = item.func;
        })
    }

    addEventListener(event, func) {
        if (this.eventsMap[event] !== undefined) {
            return;
        }
        if (typeof func !== 'function' && func !== undefined) {
            return;
        }

        this.eventsMap[event] = func;
    }

    dispatchEvent(event, ...args) {
        if (this.eventsMap[event] === undefined) {
            return;
        }

        return this.eventsMap[event](...args);
    }
}
