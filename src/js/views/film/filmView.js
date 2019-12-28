import View from '../../libs/view.js';
import template from './filmView.tmpl.xml';
import {errorMessages} from '../../libs/constants';
import {clearError, renderError} from '../../libs/errorMessages';
import starsInit from '../../libs/stars';


/**
 * Creates a new Film view
 * @class
 * @listens 'addMyReview'
 * @listens 'onReview'
 */
export default class FilmView extends View {
    /**
     * @constructor
     * @param {Object} localEventBus
     * @param {Object} globalEventBus
     * @param {Object} root
     */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.filmData = {};

        this.localEventBus.addEventListener('reviewEvent',
            this.onReview.bind(this));
        this.localEventBus.addEventListener('addMyNewReview',
            this.addMyReview.bind(this));
        this.localEventBus.addEventListener('filmInfoOk',
            this.filmInfoOk.bind(this));
        this.localEventBus.addEventListener('getReviewsOK',
            this.reviewsOk.bind(this));
        this.localEventBus.addEventListener('addReviewFail',
            this.addReviewFail.bind(this));
        this.localEventBus.addEventListener('clearError',
            clearError.bind(this));
        this.localEventBus.addEventListener('renderError',
            renderError.bind(this));
        this.localEventBus.addEventListener('addFilmToListOK',
            this.addFilmToListOK.bind(this));
    }

    addFilmToListOK() {
        super.render(this.filmData);
        this.setListeners();
        /*const popup = document.querySelector('.js-popup');
        if (popup.classList.contains('popup_display')) {
            popup.classList.remove('popup_display');
        }*/
    }


    addReviewFail(errors = {}) {
        this.localEventBus.dispatchEvent('clearError', 'js-review-button');
        if (errors.error) {
            this.localEventBus.dispatchEvent('renderError',
                'js-review-button', errors.error);
        } else {
            this.localEventBus.dispatchEvent('renderError',
                'js-review-button', errorMessages.unknown);
        }
    }

    reviewsOk(data = {}) {
        this.filmData.reviewarray = data;
        super.render(this.filmData);
        this.setListeners();
    }

    setListeners() {
        const reviewButton = document.querySelector('.js-review-button');
        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('reviewEvent');
            });
        }

        const select = document.querySelector('.js-select');
        if (select) {
            select.addEventListener('change', this.selectListener.bind(this));

        }
    }


    filmInfoOk(data = {}) {
        this.filmData = Object.assign(this.filmData, data.film);
        this.filmData = Object.assign(this.filmData, data.params);
        super.render(this.filmData);

        setTimeout(starsInit, 500);

        this.localEventBus.dispatchEvent('getReviews', {
            filmID: this.filmData.id,
            limit: 10,
            offset: 0,
        });
        this.setListeners();
    }


    selectListener() {
        const select = document.querySelector('.js-select');
        if (select.value === 'new_list') {
            const popup = document.querySelector('.js-popup');
            popup.classList.add('popup_display');

            const create = document.getElementById('js-create-list');
            create.addEventListener('click', () => {
                const input = document.getElementById('js-list-input');
                this.localEventBus.dispatchEvent('addFilmToUserList', {
                    title: input.value || null,
                    filmID:  this.filmData.id,
                });
            });
            const close = document.getElementById('js-stop-create');
            close.addEventListener('click', () => {
                popup.classList.remove('popup_display');
                select.options[select.selectedIndex].selected = false;
            });
        } else {
            this.localEventBus.dispatchEvent('addFilmToUserList', {
                title: select.value || null,
                filmID:  this.filmData.id,
            });
        }
    }

    /**
     * Add review
     * @method
     * @param {Object} reviewData
     */
    // eslint-disable-next-line no-unused-vars
    addMyReview(reviewData) {
        this.localEventBus.dispatchEvent('getFilmInfo', {filmID: this.filmData.id});
    }


    /**
     * On review adding
     * @method
     */
    onReview() {
        this.titleInput = document.querySelector('.js-title-input');
        this.textInput = document.querySelector('.js-text-input');

        this.reviewData = {
            filmID: this.filmData.id,
            title: this.titleInput.value || null,
            description: this.textInput.value || null,
        };

        this.localEventBus.dispatchEvent('reviewCheck', this.reviewData);
    }

    /**
     * Render the film page
     * @param {Object} data
     */
    render(data = {}) {
        this.filmData = {};
        //super.render({is_auth:true});
        //this.setListeners()
        this.localEventBus.dispatchEvent('getFilmInfo', data);
    }
}
