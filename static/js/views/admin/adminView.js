import View from '../../libs/view.js'

export default class AdminView extends View {
    constructor(localEventBus, globalEventBus = {}) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

        this.localEventBus.addEventListener('myFilmAddEvent', this.onFilmAdd.bind(this));
        this.localEventBus.addEventListener('filmAdded', this.addNewFilm.bind(this));
        this.localEventBus.addEventListener('filmAddFailed', this.addFilmFailed.bind(this));

    }

    addNewFilm() {
        console.log('new film added');
    }

    addFilmFailed() {
        console.log('Film adding failed');
    }

    onFilmAdd() {
        console.log('on adding film');

        this.filmInfo = {
          year: 2019,
          genre:'romance',
        };

        this.localEventBus.dispatchEvent('addFilmCheck', this.filmInfo);
    }

    render(root, data) {
        super.render(root, data);

        this.adminFormButton = document.getElementById('admin-form__button');
        this.adminFormButton.addEventListener('click', this.localEventBus.dispatchEvent('myFilmAddEvent'));
    }
}