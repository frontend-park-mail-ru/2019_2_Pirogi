import View from '../../libs/view.js';

/** class*/
export default class FilmView extends View {
  /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
  constructor(localEventBus, globalEventBus = {}) {
    super(localEventBus);

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
   * @param {object} root
   * @param {object} data
   */
  render(root, data = {}) {
    console.log('render film page');

    super.render(root, data);

    this.reviewSubmit = document.getElementById('review-submit');
    this.reviewSubmit.addEventListener('click',
        this.localEventBus.dispatchEvent('myReviewEvent'));
  }
}
