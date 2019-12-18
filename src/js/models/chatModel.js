
export default class ChatModel {
    /**
     * @constructor
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }
}