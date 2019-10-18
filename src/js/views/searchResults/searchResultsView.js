import View from '../../libs/view.js';
import template from './searchResult.tmpl.xml';
import genrestmpl from './genresView.tmpl.xml'
import ratingtml from './ratingsView.tmpl.xml'
import EventBus from '../../libs/eventBus';


/**
 * Creates a new search results view
 * @class
 * @type {SearchResultsView}
 */
export default class SearchResultsView extends View {
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
     * Renders the search results
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        console.log('rendering searchResults page');
        if (data['films'] === '') {
            super.template = genrestmpl;
        } else if (data['ratings'] === '') {
            super.template = ratingtml;
        } else {
            super.template = template;
        }
        super.render(data);
    }
}
