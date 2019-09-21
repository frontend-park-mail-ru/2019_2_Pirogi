export default class SearchResultsModel {
    constructor(localEventBus, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }
}
