import EventBus from '../libs/eventBus.js';
import IndexModel from '../models/indexModel.js';
import IndexView from '../views/index/indexView.js';

/**
 * Array of all events
 * @type {Array|string}
 */
const indexEvents = [];

/**
 *Creates a new Index controller
 * @class
 * @type {IndexController}
 */
export default class IndexController {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = EventBus, root = EventBus) {
        this.localEventBus = new EventBus(indexEvents);
        this.indexView = new IndexView(this.localEventBus, globalEventBus, root);
        this.indexModel = new IndexModel(this.localEventBus, globalEventBus);
    }
}
