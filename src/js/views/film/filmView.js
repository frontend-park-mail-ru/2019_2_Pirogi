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

        this.localEventBus.addEventListener('myReviewEvent',
            this.onReview.bind(this));
        this.localEventBus.addEventListener('addMyNewReview',
            this.addMyReview.bind(this));
        this.localEventBus.addEventListener('filmInfoOk',
            this.filmInfoOk.bind(this));
        this.localEventBus.addEventListener('filmInfoFailed',
            this.filmInfoFailed.bind(this));
    }

    filmInfoFailed() {
        console.log('film info failed');
    }
    
    filmInfoOk(data = {}) {
        super.render(data);
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
        console.log('read data for review');

        this.reviewData = {
            title: 'blablabla',
            body: 'blablablablablabla',
        };
        this.localEventBus.dispatchEvent('reviewCheck', this.reviewData);
    }

    /**
     * Render the film page
     * @param {Object} data
     */
    render(data = {}) {
        console.log(data);
        console.log('render film page');
        this.localEventBus.dispatchEvent('getFilmInfo', data);

        //super.render(data);
    }
}
