import Api from '../libs/api';
import {validateEmail, validateName, validatePassword} from "../libs/formValidation";

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

    getProfile() {
        Api.getProfileInfo()
            .then( (res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('getInfoOk', data));
                } else {
                    this.localEventBus.dispatchEvent('getInfoFailed');
                }
            });
    }

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

    onEditingProfile(data = {}) {
        let errors = {};
        if (!validateName(data.name)) {
            errors.name = false;
        }
        if (!validateEmail(data.email)) {
            errors.email = false;
        }
        if (!validatePassword(data.password)) {
            errors.password = false;
        }
        if (Object.entries(errors).length !== 0) {
            this.localEventBus.dispatchEvent('editFailed', errors);
            return;
        }

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
