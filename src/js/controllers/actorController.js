import EventBus from '../libs/eventBus.js';
import ActorModel from '../models/actorModel';
import ActorView from '../views/actor/actorView';
/**
 * Array of all events
 * @type {Array|string}
 */
const actorEvents = [];
/**
 *Creates a new Iactor controller
 * @class
 * @type {IndexController}
 */
export default class ActorController {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = EventBus, root = EventBus) {
        this.localEventBus = new EventBus(actorEvents);
        this.actorView = new ActorView(this.localEventBus, globalEventBus, root);
        this.actorModel = new ActorModel(this.localEventBus, globalEventBus);
    }
}