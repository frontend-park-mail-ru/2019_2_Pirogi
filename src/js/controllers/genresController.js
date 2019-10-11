import EventBus from '../libs/eventBus.js';
import GenresModel from '../models/genresModel';
import GenresView from '../views/genres/genresView';

/**
 * List of all search events
 * @type {Array|string}
 */
const searchEvents = [];
/**
 * Create a new Search Results controller
 * @class
 * @type {S}
 */
export default class GenresController {
    /**
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(searchEvents);

        this.genresView = new GenresView(this.localEventBus,
            globalEventBus,
            root);
        this.genresModel = new GenresModel(this.localEventBus,
            globalEventBus);
    }
}
