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
        this.localEventBus.addEventListener('onEditingAvatar',
            this.onEditingAvatar.bind(this));

        this.localEventBus.addEventListener('getProfileInfo',
            this.getProfile.bind(this));
    }

    getProfile(data = {}) {
        Api.getProfileInfo(data)
            .then( (res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('getInfoOk', data));
                } else {
                    this.localEventBus.dispatchEvent('getInfoFailed');
                }
            });
    }

    onEditingAvatar(data = {}) {
        Api.editAvatar(data)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('editOk');
                } else {
                    this.localEventBus.dispatchEvent('editFailed', data);
                }
            });
    }

    onEditingProfile(data = {}) {
        // первичная валидация

        Api.editProfile(data)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('editOk');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('editFailed', data));
                }
            });
    }
}
