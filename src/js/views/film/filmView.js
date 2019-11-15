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

        this.filmData = {
            isAuth: false,
        };

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
        this.localEventBus.addEventListener('authOK', () => this.authOK());
    }

    authOK() {
        this.filmData.isAuth = true;
        this.filmInfoOk();
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
        const reviewButton = document.querySelector('.js-review-button');
        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('reviewEvent');
            });
        }
    }


    filmInfoOk(data = {}) {
        this.filmData = Object.assign(this.filmData, data);
        super.render(this.filmData);

        starsInit();

        const reviewButton = document.querySelector('.js-review-button');
        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('reviewEvent');
            });
        }

        this.localEventBus.dispatchEvent('getReviews', {
            filmID: this.filmData.id,
            limit: 10,
            offset: 0,
        });
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
        this.localEventBus.dispatchEvent('isAuth');
        this.filmData = {};
        this.filmData.isAuth = this.globalEventBus.dispatchEvent('isAuth');
        this.localEventBus.dispatchEvent('getFilmInfo', data);
    }
}
