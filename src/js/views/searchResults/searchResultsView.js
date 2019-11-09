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

        this.renderData = {
            filmsArray: [],
            genres: [],
            searchParams: {},
        };

        this.localEventBus.addEventListener('getResultsOK',
            this.resultsOK.bind(this));
        this.localEventBus.addEventListener('getGenresOK',
            this.genresOK.bind(this));
    }

    genresOK(data = {}) {
        this.renderData.genres = data;

        const searchParams = {
            limit: 8,
            offset: 0,
            genres: data[0],
        };
        this.localEventBus.dispatchEvent('getResults', searchParams);
    }

    resultsOK(data = {}) {
        this.renderData.filmsArray = data;

        super.render(this.renderData);
    }

    /**
     * Renders the search results
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        this.renderData = {
            filmsArray: [],
            genres: [],
            searchParams: {},
        };


        data.limit = 10;
        data.offset = 0;
        if (data.films === 'films') {
            this.localEventBus.dispatchEvent('getGenres');
            super.template = genrestmpl;
            this.renderData.searchParams = data;
            //this.searchData = Object.assign(this.searchData, data);
            super.render(this.renderData);
            return;
        } else if (data.ratings === 'ratings') {
            super.template = ratingtml;
        } else if (data.new === 'new') {
            super.template = template;
            data.orderby = 'date';
        } else {
            super.template = template;

        }
        this.renderData.searchParams = data;
        super.render(this.renderData);

        this.localEventBus.dispatchEvent('getResults', this.renderData.searchParams);


    }
}
