import EventBus from '../libs/eventBus';
import SearchResultsModel from '../models/searchResultsModel';
import SearchResultsView from '../views/searchResults/searchResultsView';

const searchEvents = [
  {},
];
/** class*/
export default class SearchResultsController {
  /**
   * @param {object} globalEventBus
   */
  constructor(globalEventBus) {
    this.localEventBus = new EventBus(searchEvents);

    this.searchResultsView = new SearchResultsView(this.localEventBus,
        globalEventBus);
    this.searchResultsModel = new SearchResultsModel(this.localEventBus,
        globalEventBus);
  }
}
