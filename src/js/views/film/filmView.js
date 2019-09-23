import View from '../../libs/view.js';

/** class*/
export default class FilmView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('myReviewEvent',
            this.onReview.bind(this));
        this.localEventBus.addEventListener('addMyNewReview',
            this.addMyReview.bind(this));
    }

    /**
   * @param {object} reviewData
   */
    addMyReview(reviewData) {
        console.log('add new review');
        console.log(reviewData);
    }

    /** function */
    onReview() {
        console.log('read data for review');

        this.reviewData = {
            title: 'blablabla',
            body: 'blablablablablabla',
        };
        this.localEventBus.dispatchEvent('reviewCheck', this.reviewData);
    }
    /**
   * @param {object} data
   */
    render(data = {}) {
        console.log('render film page');

        super.render(data);

        this.reviewSubmit = document.getElementById('review-submit');
        this.reviewSubmit.addEventListener('click',
            this.localEventBus.dispatchEvent('myReviewEvent'));
    }
}
