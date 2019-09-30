import {validateEmail, validateName, validatePassword} from '../libs/formValidation';
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
     * @listens onAuthCheck
     * @listens onRegisterCheck
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('onAuthCheck',
            this.onAuthCheck.bind(this));
        this.localEventBus.addEventListener('onRegisterCheck',
            this.onRegisterCheck.bind(this));
    }

    /**
     * Handles auth checking
     * @method
     * @param {object} data
     */
    onAuthCheck(data) {
        let errors = {};
        if (!validateEmail(data.email)) {
            errors.email = false;
        }
        if (!validatePassword(data.password)) {
            errors.password = false;
        }
        if (Object.entries(errors).length !== 0) {
            return errors;
        }

        Api.login(data)
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('authGood');
                    this.localEventBus.dispatchEvent('authGood');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('authFailed', data));
                }
            });
    }

    /**
     * Handles register checking
     * @param {object} data
     * @method
     */
    onRegisterCheck(data) {
        let errors = {};
        if (!validateName(data.name)) {
            errors.name = false;
        }
        if (!validateEmail(data.email)) {
            errors.email = false;
        }
        if (!validatePassword(data.password1)) {
            errors.password = false;
        }
        if (data.password1 !== data.password2) {
            errors.passwordsMatch = false;
        }
        if (Object.entries(errors).length !== 0) {
            return errors;
        }

        Api.register(data)
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('authGood');
                    this.localEventBus.dispatchEvent('authGood');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('registerFailed', data));
                }
            });
    }
}
