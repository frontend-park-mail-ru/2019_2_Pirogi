import View from '../../libs/view.js';
import template from './searchResult.tmpl.xml';
import genrestmpl from './genresView.tmpl.xml';
import ratingtml from './ratingsView.tmpl.xml';
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

        this.searchData = {};

        this.localEventBus.addEventListener('getResultsOK',
            this.resultsOK.bind(this));
    }

    resultsOK(data = {}) {
        this.searchData.filmsArray = data;

        super.render(this.searchData);
    }



    /**
     * Renders the search results
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        console.log('rendering searchResults page');
        if (data.films === 'films') {
            super.template = genrestmpl;
        } else if (data.ratings === 'ratings') {
            super.template = ratingtml;
            this.localEventBus.dispatchEvent('getRatings', data);
        } else if (data.news === 'news') {
            super.template = template;
        } else {
            super.template = template;

        }

        data.limit = 10;
        data.offset = 0;
        this.localEventBus.dispatchEvent('getResults', data);
        this.searchData = data;
        super.render(data);


    }
}
