import {validators} from '../libs/formValidation';
import {errorMessages} from '../libs/errorMessages';
import Api from '../libs/api';

/**
 * Create a Login model
 * @class
 * @type {LoginModel}
 */
export default class LoginModel {
    /**
     * @constructor
     * @param {object} localEventBus
     * @param {object} globalEventBus
     * @listens loginCheck
     * @listens registrationCheck
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.registrationData = {
            name: null,
            email: null,
            password: null
        };
        this.loginData = {
            email: null,
            password: null
        };

        this.localEventBus.addEventListener('checkField',
            this.fieldCheck.bind(this));
        this.localEventBus.addEventListener('passwordsCheck',
            this.passwordsCheck.bind(this));

        this.localEventBus.addEventListener('modifyLoginData',
            this.modifyLoginData.bind(this));
        this.localEventBus.addEventListener('modifyRegistrationData',
            this.modifyRegistrationData.bind(this));

        this.localEventBus.addEventListener('loginCheck',
            this.loginCheck.bind(this));
        this.localEventBus.addEventListener('registrationCheck',
            this.registrationCheck.bind(this));
    }

    fieldCheck(field) {
        if (!validators[field.target.name](field.target.value)) {
            this.localEventBus.dispatchEvent('renderError', field.target.id, errorMessages[field.target.name]);
            return false;
        }
        this.localEventBus.dispatchEvent('clearError', field.target.id);
        return true;
    }

    passwordsCheck(fields) {
        const password = fields.password;
        const passwordClone = fields.passwordClone;
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

    modifyLoginData(target, value) {
        this.loginData[target] = value;
    }

    modifyRegistrationData(target, value) {
        this.registrationData[target] = value;
    }

    /**
     * Handles auth checking
     * @method
     * @param {object} data
     */
    loginCheck() {
        if (!this.dataCheck(this.loginData)) {
            this.localEventBus.dispatchEvent('loginFailed',
                {error: 'Please correct fields.'});
            return;
        }
        Api.login(this.loginData)
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('authorizationSuccessful');
                    this.localEventBus.dispatchEvent('authorizationSuccessful');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('loginFailed', data));
                }
            });
    }

    /**
     * Handles register checking
     * @param {object} data
     * @method
     */
    registrationCheck() {
        if (!this.dataCheck(this.registrationData)) {
            this.localEventBus.dispatchEvent('registrationFailed',
                {error: 'Please correct fields.'});
            return;
        }
        Api.register(this.registrationData)
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('authorizationSuccessful');
                    this.localEventBus.dispatchEvent('authorizationSuccessful');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('registrationFailed', data));
                }
            });
    }

    dataCheck(data) {
        for (const property in data) {
            if (Object.prototype.hasOwnProperty.call(data, property)
                && !data[property]) {
                return false;
            }
        }
        return true;
    }
}
