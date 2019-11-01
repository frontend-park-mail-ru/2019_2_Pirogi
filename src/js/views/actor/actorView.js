import View from '../../libs/view.js';
import template from './actorView.tmpl.xml';
import EventBus from '../../libs/eventBus';


/**
 * Creates a new Actor view
 * @class
 * @type {IndexView}
 */
export default class ActorView extends View {
    /**
     * @constructor
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     * @param {Object} root
     */
    constructor(localEventBus = EventBus, globalEventBus = EventBus, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;
    }
    /**
     * Render the Index view
     * @param {Object} data
     */
    render(data = {}) {
        super.render(data);
    }
}