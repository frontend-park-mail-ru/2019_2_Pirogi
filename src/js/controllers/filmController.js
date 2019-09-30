import EventBus from '../libs/eventBus.js';
import FilmModel from '../models/filmModel.js';
import FilmView from '../views/film/filmView.js';

const filmEvents = [
    {key: 'myReviewEvent'},
    {key: 'addMyNewReview'},
    {key: 'reviewCheck'},
];

/**
 * Creates a new Film controller
 * @class
 * @type {FilmController}
 */
export default class FilmController {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(filmEvents);
        this.filmModel = new FilmModel(this.localEventBus, globalEventBus);
        this.filmView = new FilmView(this.localEventBus, globalEventBus, root);
    }
}
