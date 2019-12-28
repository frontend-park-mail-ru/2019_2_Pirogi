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

    doSearch() {
        this.renderData.filmsArray = [];
        const searchInput = document.getElementById('js-search-input');
        this.renderData.searchParams['query'] = searchInput.value || null;
        const searchForm = document.querySelector('.js-search-form');

        const searchFormData = new FormData(searchForm);
        searchFormData.forEach((val,name) => {
            val = val.replace(/, /g, ',');
            this.renderData.searchParams[name] = val.replace(/ /g, '+');
        });
        this.localEventBus.dispatchEvent('getResults', this.renderData.searchParams);
    }


    resultsOK(data = {}) {
        this.renderData.filmsArray = Array.prototype.concat(this.renderData.filmsArray, data);

        super.render(this.renderData);

        const searchButton = document.getElementById('js-search-params');
        const searchForm = document.querySelector('.js-search-form');
        if (searchButton && searchForm) {
            searchButton.addEventListener('click', () => this.doSearch());
            searchForm.addEventListener('keydown', (event) => {
                if (event.code === 'Enter') {
                    this.doSearch();
                }
            });
        }
        const more = document.querySelector('.js-more-res-button');
        if (more) {
            more.addEventListener('click', () => {
                this.renderData.searchParams.limit += 10;
                this.renderData.searchParams.offset += 10;
                this.localEventBus.dispatchEvent('getResults', this.renderData.searchParams);
            });
        }
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
            data.order_by = 'mark';
            super.template = ratingtml;
        } else if (data.new === 'new') {
            super.template = template;
            data.order_by = 'year';
        } else {
            super.template = template;

        }
        this.renderData.searchParams = data;
        super.render(this.renderData);

        this.localEventBus.dispatchEvent('getResults', this.renderData.searchParams);

        const searchButton = document.getElementById('js-search-params');
        if (searchButton) {
            searchButton.addEventListener('click', () => this.doSearch());
        }
    }
}
