import Api from "../libs/api";

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

        this.localEventBus.addEventListener('getResults',
            this.getResults.bind(this));
    }

    getResults(data = {}) {
        Api.getList(data)
            .then((res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('getResultsOK', data));
                } else {
                    this.localEventBus.dispatchEvent('getResultsFail');
                }
            });
    }
}
