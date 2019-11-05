import View from '../../libs/view.js';
import template from './filmView.tmpl.xml';
import {errorMessages} from '../../libs/constants';
import {clearError, renderError} from '../../libs/errorMessages';


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

        super.render(data);
    }

    
    filmInfoOk(data = {}) {
        super.render(data);

        this.filmData = data;

        this.reviewButton = document.querySelector('.js-review-button');
        this.reviewButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('reviewEvent');});

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
    addMyReview(reviewData) {
        console.log('add new review');
        console.log(reviewData);
    }


    /**
     * On review adding
     * @method
     */
    onReview() {
        this.titleInput = document.querySelector('.js-title-input');
        this.textInput = document.querySelector('.js-text-input');

        this.reviewData = {
            title: this.textInput.value || null,
            description: this.textInput.value || null,
        };

        this.localEventBus.dispatchEvent('reviewCheck', this.reviewData);
    }

    /**
     * Render the film page
     * @param {Object} data
     */
    render(data = {}) {
        this.localEventBus.dispatchEvent('getFilmInfo', data);
    }
}
