import Api from '../libs/api';
import {validators} from '../libs/formValidation';
import {errorMessages} from '../libs/constants';



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

        this.localEventBus.addEventListener('checkField',
            this.fieldCheck.bind(this));
        this.localEventBus.addEventListener('passwordsCheck',
            this.passwordsCheck.bind(this));

        this.passwordData = {
            oldPassword: null,
            password: null,
        };
        this.loginData = {
            email: null,
        };

        this.infoData = {
            username: null,
            description: null,
        };

        this.localEventBus.addEventListener('modifyLoginData',
            this.modifyLoginData.bind(this));
        this.localEventBus.addEventListener('modifyInfoData',
            this.modifyInfoData.bind(this));
        this.localEventBus.addEventListener('modifyPasswordData',
            this.modifyPasswordData.bind(this));
    }

    /**
     * Modify current Login data
     * @method
     * @param target
     * @param value
     */
    modifyLoginData(target, value) {
        this.loginData[target] = value;
    }

    modifyInfoData(target, value) {
        this.infoData[target] = value;
    }

    /**
     * Modify current registration value
     * @method
     * @param target
     * @param value
     */
    modifyPasswordData(target, value) {
        this.passwordData[target] = value;
    }


    /**
     * Check fields
     * @method
     * @param field
     * @returns {boolean}
     */
    fieldCheck(field) {
        if (!validators[field.target.name]) {
            return true;
        }
        if (!validators[field.target.name](field.target.value)) {
            this.localEventBus.dispatchEvent('renderError', field.target.id, errorMessages[field.target.name]);
            return false;
        }
        this.localEventBus.dispatchEvent('clearError', field.target.id);
        return true;
    }

    /**
     * Check password fields
     * @method
     * @param fields
     * @returns {boolean}
     */
    passwordsCheck({password, passwordClone}) {
        if (!validators[password.name](password.value)) {
            this.localEventBus.dispatchEvent('renderError',
                password.id, errorMessages[password.name]);
            return false;
        }
        this.localEventBus.dispatchEvent('clearError', password.id);
        if (password.value !== passwordClone.value) {
            this.localEventBus.dispatchEvent('renderError',
                passwordClone.id, errorMessages.passwordMatch);
            return false;
        }
        this.localEventBus.dispatchEvent('clearError', passwordClone.id);
        return true;
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
    onEditingAvatar(data = {}) {
        Api.editAvatar({avatar: data})
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('editOk');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('avatarEditFailed', data));
                }
            });
    }

    /**
     * Profile handler
     * @method
     * @param {object} data
     */
    onEditingProfile() {
        if (!this.infoData.username && !this.infoData.description) {
            this.localEventBus.dispatchEvent('editFailed', {error: errorMessages.form});
            return;
        }
        Api.editProfile(this.infoData)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('editOk');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('editFailed', data));
                }
            });
    }


    /**
     * Check all fields to be right
     * @method
     * @param data
     * @returns {boolean}
     */
    dataCheck(data) {
        for (const property in data) {
            if (!data[property]) {
                return false;
            }
        }
        return true;
    }

}
