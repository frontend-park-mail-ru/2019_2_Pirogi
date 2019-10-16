import Api from '../libs/api';
import {validateEmail, validateName, validatePassword} from '../libs/formValidation';


/**
 * Create a Profile model
 * @class
 * @type {ProfileModel}
 */
export default class ProfileModel {
    /**
     * Контроллер профиля
     * @constructor
     * @param {object} localEventBus
     * @param {object} globalEventBus
     * @listens onEditingProfile
     * @listens onEditingAvatar
     * @listens getProfile
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

    /**
     * Profile request
     * @method
     * @static
     */
    getProfile() {
        Api.getProfileInfo()
            .then((res) => {
                if (res.ok) {
                    res.json().then(data => {
                        if (/jpeg/.test(data.avatar_link)) {
                            data.avatar_link = data.avatar_link.replace(/jpeg/, 'jpg');
                        }
                        this.localEventBus.dispatchEvent('getInfoOk', data);});
                } else {
                    this.localEventBus.dispatchEvent('getInfoFailed');
                }
            });
    }

    /**
     * Avatar handler
     * @method
     * @param {object} data
     */
    onEditingAvatar(data = {}, userData) {
        Api.editAvatar({avatar: data, userID: userData.user_id})
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('editOk');
                } else {
                    this.localEventBus.dispatchEvent('editFailed', data);
                }
            });
    }

    /**
     * Profile handler
     * @method
     * @param {object} data
     */
    onEditingProfile(data = {}) {

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
