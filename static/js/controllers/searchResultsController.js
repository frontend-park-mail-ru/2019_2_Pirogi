import EventBus from '../libs/eventBus';
import SearchResultsModel from '../models/searchResultsModel';
import SearchResultsView from '../views/searchResults/searchResultsView';

const searchEvents = [
    {key:'', func: undefined},
];

export default class SearchResultsController {
    constructor(globalEventBus) {
        this.localEventBus = new EventBus(searchEvents);

        this.searchResultsView = new SearchResultsView(this.localEventBus, globalEventBus);
        this.searchResultsModel = new SearchResultsModel(this.localEventBus, globalEventBus);
    }
}