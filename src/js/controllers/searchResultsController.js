import EventBus from '../libs/eventBus.js';
import SearchResultsModel from '../models/searchResultsModel.js';
import SearchResultsView from '../views/searchResults/searchResultsView.js';

/**
 * List of all search events
 * @type {Array|string}
 */
const searchEvents = [];
/**
 * Create a new Search Results controller
 * @class
 * @type {SearchResultsController}
 */
export default class SearchResultsController {
    /**
     * @param {EventBus} globalEventBus
     * @param {Element} root
   */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(searchEvents);

        this.searchResultsView = new SearchResultsView(this.localEventBus,
            globalEventBus,
            root);
        this.searchResultsModel = new SearchResultsModel(this.localEventBus,
            globalEventBus);
    }
}
