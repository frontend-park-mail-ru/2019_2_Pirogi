import View from '../../libs/view.js';
import template from './adminView.tmpl.xml';

/** class*/
export default class AdminView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
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

    /** function */
    addNewFilm() {
        console.log('new film added');
    }

    /** function */
    addFilmFailed() {
        console.log('Film adding failed');
    }

    /** function */
    onFilmAdd() {
        console.log('on adding film');

        this.filmInfo = {
            year: 2019,
            genre: 'romance',
        };

        this.localEventBus.dispatchEvent('addFilmCheck', this.filmInfo);
    }
    /**
   * @param {object} data
   */
    render(data = {}) {
        super.render(data);

        this.adminFormButton = document.getElementsByClassName('admin-form__button')[0];
        this.adminFormButton.addEventListener('click',
            this.localEventBus.dispatchEvent('myFilmAddEvent'));
    }
}
