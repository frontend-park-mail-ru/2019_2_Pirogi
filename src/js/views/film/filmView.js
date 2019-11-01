import View from '../../libs/view.js';
import template from './filmView.tmpl.xml';


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

        this.localEventBus.addEventListener('reviewEvent',
            this.onReview.bind(this));
        this.localEventBus.addEventListener('addMyNewReview',
            this.addMyReview.bind(this));
        this.localEventBus.addEventListener('filmInfoOk',
            this.filmInfoOk.bind(this));
    }

    
    filmInfoOk(data = {}) {
        super.render(data);

        this.reviewButton = document.querySelector('.js-review-button');
        this.reviewButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('reviewEvent');});
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
