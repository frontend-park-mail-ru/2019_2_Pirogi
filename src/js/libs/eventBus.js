/** class*/
export default class EventBus {
  /**
   * @param {array} events
   */
  constructor(events = [{}]) {
    this.eventsMap = new Map();
    events.forEach((item) => {
      if (item.key === undefined) {
        console.log('Error! key = null');
        return;
      }

      if (typeof item.func !== 'function' && item.func !== undefined) {
        console.log('Error! function != function');
        return;
      }

      if (this.eventsMap[item.key] !== undefined) {
        console.log('Error! key have already exists');
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
    if (this.eventsMap[event] !== undefined) {
      console.log('Error! key have already exists');
      return;
    }
    if (typeof func !== 'function' && func !== undefined) {
      console.log('Error! function != function');
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
    if (this.eventsMap[event] === undefined) {
      console.log('Error! key does not exists');
      return;
    }

    return this.eventsMap[event](...args);
  }
}
