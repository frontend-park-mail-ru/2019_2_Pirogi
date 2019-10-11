import View from '../../libs/view.js';
import template from './ratingsView.tmpl.xml';
import EventBus from '../../libs/eventBus';


/**
 * Creates a new view
 * @class
 * @type {SearchResultsView}
 */
export default class RatingsView extends View {
    /**
     * @constructor
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     * @param {Object} root
     */
    constructor(localEventBus = EventBus, globalEventBus = EventBus, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }

    /**
     * Renders
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        console.log('rendering page');
        super.render(data);
    }
}
