export default class IndexModel {
    constructor(localEventBus, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }
}
