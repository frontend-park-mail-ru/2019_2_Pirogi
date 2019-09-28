import Api from '../libs/api';

/** class*/
export default class ProfileModel {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('onEditingProfile',
            this.onEditingProfile.bind(this));
    }

    onEditingProfile(data = {}) {
        console.log('lets check data for edit');
        // первичная валидация

        Api.editProfile(data)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('editGood');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('editFailed', data));
                }
            });
    }
}
