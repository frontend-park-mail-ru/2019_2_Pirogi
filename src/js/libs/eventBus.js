
/** class*/
export default class EventBus {
    /**
   * @param {array} events
   */
    constructor(events = [{}]) {
        this.eventsMap = new Map();
        events.forEach((item) => {
            if (item.key === undefined) {
                console.log('No key value');
                return;
            }

            if (typeof item.func !== 'function' && item.func !== undefined) {
                console.log('func arg is not function');
                return;
            }

            if (this.eventsMap[item.key] !== undefined) {
                console.log('Key' + item.key + 'have already exist');
                return;
            }

            this.eventsMap[item.key] = item.func;
        });
    }

    /**
   * @param {string} event
   * @param {function} func
   */
    addEventListener(event, func) {
        if (event === undefined) {
            console.log('No event value ');
            return;
        }

        if (this.eventsMap[event] !== undefined) {
            console.log('Key' + event + 'have already exist');
            return;
        }

        if (typeof func !== 'function') {
            console.log('func arg is not function');
            return;
        }

        this.eventsMap[event] = func;
    }

    /**
   * @param {string} event
   * @param {object} args
   * @return {*} blabla
   */
    dispatchEvent(event, ...args) {
        if (event === undefined) {
            console.log('No event value');
            return;
        }

        if (this.eventsMap[event] === undefined) {
            console.log('No such event: ' + event);
            return;
        }

        return this.eventsMap[event](...args);
    }
}
