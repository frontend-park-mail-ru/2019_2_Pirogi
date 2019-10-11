/**
 * Creates a new  model
 * @class
 * @type {SearchResultsModel}
 */
export default class RatingsModel {
    /**
     * Модель результатов поиска
     * @constructor
     * @param {object} localEventBus
     * @param {object} globalEventBus
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }
}
