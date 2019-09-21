export default class FilmModel {
    constructor(localEventBus, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('reviewCheck', this.onReviewCheck.bind(this));
    }

    onReviewCheck(data) {
        console.log('checking review');
        this.localEventBus.dispatchEvent('addMyNewReview', data);
    }
}
