import View from '../../libs/view.js';
import template from './adminView.tmpl.xml';
import EventBus from '../../libs/eventBus';

/**
 * Creates a new Admin view
 * @class
 * @type {AdminView}
 * @listens 'filmAdded'
 * @listens 'myFilmAddEvent'
 * @listens 'filmAddFailed'
 */
export default class AdminView extends View {
    /**
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     * @param {Object} root
     */
    constructor(localEventBus = EventBus, globalEventBus = EventBus, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

        this.localEventBus.addEventListener('myFilmAddEvent',
            this.onFilmAdd.bind(this));
        this.localEventBus.addEventListener('filmAdded',
            this.addNewFilm.bind(this));
        this.localEventBus.addEventListener('filmAddFailed',
            this.addFilmFailed.bind(this));
    }

    /**
     * Adds new film
     * @method
     */
    addNewFilm() {
        console.log('new film added');
    }

    /**
     * Failed while adding film
     * @method
     */
    addFilmFailed() {
        console.log('Film adding failed');
    }

    /**
     * @method
     */
    onFilmAdd() {
        console.log('on adding film');

        this.filmInfo = {
            year: 2019,
            genre: 'romance',
        };

        this.localEventBus.dispatchEvent('addFilmCheck', this.filmInfo);
    }

    /**
     * Render the view
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        super.render(data);

        this.adminFormButton = document.getElementsByClassName('admin-form__button')[0];
        this.adminFormButton.addEventListener('click',
            this.localEventBus.dispatchEvent('myFilmAddEvent'));
    }
}
