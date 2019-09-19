import EventBus from "../libs/eventBus";
import SearchModel from "../models/searchModel";
import SearchView from "../views/search/searchView";


const searchEvents = [
    {key:"", func: undefined},
];

export default class SearchController {
    constructor(globalEventBus) {
        this.localEventBus = new EventBus(searchEvents);

        this.sView = new SearchView(this.localEventBus, globalEventBus);
        this.sModel = new SearchModel(this.localEventBus, globalEventBus);
    }
}