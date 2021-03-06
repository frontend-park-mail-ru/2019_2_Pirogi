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
    constructor(globalEventBus = EventBus, root = EventBus, router) {

        this.localEventBus = new EventBus(actorEvents);


        this.localEventBus.addEventListener('filmListFailed', () =>
            router.route('/404')
        );

        this.actorView = new ActorView(this.localEventBus, globalEventBus, root);
        this.actorModel = new ActorModel(this.localEventBus, globalEventBus);
    }
}