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
    onReviewCheck(data) {
        console.log('checking review');
        this.localEventBus.dispatchEvent('addMyNewReview', data);
    }
}
