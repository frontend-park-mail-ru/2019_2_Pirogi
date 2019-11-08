import Api from '../libs/api';

/**
 * Creates a ne Film model
 * @class
 * @type {FilmModel}
 */
export default class FilmModel {
    /**
     * @constructor
     * @param {object} localEventBus
     * @param {object} globalEventBus
     * @listens onReviewCheck
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('reviewCheck',
            this.onReviewCheck.bind(this));

        this.localEventBus.addEventListener('getFilmInfo',
            this.getFilmInfo.bind(this));

        this.localEventBus.addEventListener('getReviews',
            this.getReviews.bind(this));
    }

    getReviews(data = {}) {
        Api.getReviews(data)
            .then((res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('getReviewsOK', data));
                } else {
                    this.localEventBus.dispatchEvent('getReviewsFail');
                }
            });
    }


    getFilmInfo(data = {}) {
        Api.getFilmInfo(data)
            .then((res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('filmInfoOk', data));
                } else {
                    this.localEventBus.dispatchEvent('filmInfoFailed');
                }
            })
            //TODO: правильно обработать ошибки
            .catch(() => {console.log('Get Film Info Failed');} );
    }
    /**
     * Checks the review
     * @param {object} data
     */
    onReviewCheck(data = {}) {
        Api.sendReview(data)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('addMyNewReview');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('addReviewFail', data));
                }
            });
    }
}
