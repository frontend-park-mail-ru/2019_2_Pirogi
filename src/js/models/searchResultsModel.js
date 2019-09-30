/**
 * Creates a new Search Results model
 * @class
 * @type {SearchResultsModel}
 */
export default class SearchResultsModel {
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
