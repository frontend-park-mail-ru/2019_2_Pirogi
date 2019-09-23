/** class*/
export default class FilmModel {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('reviewCheck',
            this.onReviewCheck.bind(this));
    }

    /**
   * @param {object} data
   */
    onReviewCheck(data) {
        console.log('checking review');
        this.localEventBus.dispatchEvent('addMyNewReview', data);
    }
}
