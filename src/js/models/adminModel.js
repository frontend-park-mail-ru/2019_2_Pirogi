/** class*/
export default class AdminModel {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
    constructor(localEventBus, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('addFilmCheck',
            this.onAddFilmCheck.bind(this));
    }

    /**
   * @param {object} filmInfo
   */
    onAddFilmCheck(filmInfo) {
        console.log('trying to add new film');
        console.log(filmInfo);
        this.isNormal = true;
        if (this.isNormal) {
            this.localEventBus.dispatchEvent('filmAdded');
        } else {
            this.localEventBus.dispatchEvent('filmAddFailed');
        }
    }
}
