export default class AdminModel {
    constructor(localEventBus, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('addFilmCheck', this.onAddFilmCheck.bind(this));
    }

    onAddFilmCheck(filmInfo) {
        console.log('trying to add new film')
        this.isNormal = true;
        if (this.isNormal) {
            this.localEventBus.dispatchEvent('filmAdded');
        } else {
            this.localEventBus.dispatchEvent('filmAddFailed');
        }
    }
}