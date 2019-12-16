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
            infoOk: false,
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
        this.localEventBus.addEventListener('addFilmToListOK',
            this.addFilmToListOK.bind(this));
    }

    addFilmToListOK() {
        const listButton = document.querySelector('.js-user-list-button');
        listButton.classList.add('user-block__button_disabled');
    }

    authOK() {
        this.filmData.isAuth = true;
        if (this.filmData.infoOk) {
            this.filmInfoOk();
        }
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
        const listButton = document.querySelector('.js-user-list-button');
        if (listButton) {
            listButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('addFilmToUserList', {
                    title: 'myList',
                    filmID:  this.filmData.id,
                });
            });
        }
    }


    filmInfoOk(data = {}) {
        this.filmData.infoOk = true;
        this.filmData = Object.assign(this.filmData, data);
        super.render(this.filmData);

        setTimeout(starsInit, 500);

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

        const listButton = document.querySelector('.js-user-list-button');
        if (listButton) {
            listButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('addFilmToUserList', {
                    title: 'myList',
                    filmID:  this.filmData.id,
                });
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
        this.localEventBus.dispatchEvent('isAuth');
        this.filmData = {};
        this.filmData.isAuth = this.globalEventBus.dispatchEvent('isAuth');
        this.localEventBus.dispatchEvent('getFilmInfo', data);
    }
}
