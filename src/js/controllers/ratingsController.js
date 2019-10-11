import EventBus from '../libs/eventBus.js';
import RatingsModel from '../models/ratingsModel';
import RatingsView from '../views/ratings/ratingsView';
/**
 * List of all search events
 * @type {Array|string}
 */
const searchEvents = [];
/**
 * Create a new controller
 * @class
 * @type {RatingsController}
 */
export default class RatingsController {
    /**
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(searchEvents);

        this.ratingsView = new RatingsView(this.localEventBus,
            globalEventBus,
            root);
        this.ratingsModel = new RatingsModel(this.localEventBus,
            globalEventBus);
    }
}
