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
    }

    /**
     * Checks the review
     * @param {object} data
     */
    onReviewCheck(data) {
        console.log('checking review');
        this.localEventBus.dispatchEvent('addMyNewReview', data);
    }
}
