import EventBus from '../libs/eventBus.js';
import SearchResultsModel from '../models/searchResultsModel.js';
import SearchResultsView from '../views/searchResults/searchResultsView.js';

const searchEvents = [];
/** class*/
export default class SearchResultsController {
    /**
   * @param {object} globalEventBus
   * @param {object} root
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
