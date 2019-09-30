/**
 * Creates a new EventBus
 * Класс реализует событийную модель
 * предоставляет возможность добавить новое событие и функцию
 * которая будет выполняться для этого события
 * @class
 * @type {EventBus}
 */
export default class EventBus {
    /**
     * @constructor
     * @param {Array} events
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
     * Добавляет новый обработчик события
   * @param {string} event - событие
   * @param {function} func - функция
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
     * Вызывает функцию по событию
   * @param {string} event - событие
   * @param {object} args - аргументы
   * @return {*}
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
