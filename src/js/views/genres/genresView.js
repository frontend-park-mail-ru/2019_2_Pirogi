import View from '../../libs/view.js';
import template from './genresView.tmpl.xml';
import EventBus from '../../libs/eventBus';


/**
 * Creates a new search results view
 * @class
 * @type {SearchResultsView}
 */
export default class GenresView extends View {
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
     * Renders the genres
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        console.log('rendering page');
        super.render(data);
    }
}
