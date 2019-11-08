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
        this.localEventBus.addEventListener('getGenresOK',
            this.genresOK.bind(this));
    }

    genresOK(data = {}) {
        this.searchData.genres = data;

        const searchParams = {
            limit: 8,
            offset: 0,
            genre: data[0],
        };
        this.localEventBus.dispatchEvent('getResults', searchParams);
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
        data.limit = 10;
        data.offset = 0;
        if (data.films === 'films') {
            this.localEventBus.dispatchEvent('getGenres');
            super.template = genrestmpl;
            super.render(data);
            return;
        } else if (data.ratings === 'ratings') {
            super.template = ratingtml;
        } else if (data.news === 'news') {
            super.template = template;
        } else {
            super.template = template;

        }
        super.render(data);

        this.localEventBus.dispatchEvent('getResults', data);
        this.searchData = data;

    }
}
