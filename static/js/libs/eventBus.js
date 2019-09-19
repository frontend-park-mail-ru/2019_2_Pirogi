

export default class EventBus {

    constructor(events = [{}]) {
        this.EventsArray = new Object();
        events.forEach(function(item, index, array) {
            if (this.EventsArray[item.key] != undefined)
                return;

            if (typeof item.func != "function" && item.func != undefined)
                return;

            this.EventsArray[item.key] = item.func;
        })
    }

    addEventListener(event, func) {
        if (this.EventsArray[event] != undefined)
            return;
        if (typeof func != "function" && func != undefined)
            return;
        this.EventsArray[event] = func;
    }

    callEvent(event, ...args) {
        if (this.EventsArray[event] == undefined)
            return;
        return this.EventsArray[event](...args);
    }

}