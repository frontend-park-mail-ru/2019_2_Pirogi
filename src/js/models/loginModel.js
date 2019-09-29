import {validateEmail, validateName, validatePassword} from '../libs/formValidation';
import Api from '../libs/api';

/** class*/
export default class LoginModel {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
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
                    this.globalEventBus.dispatchEvent('authPassed');
                    this.localEventBus.dispatchEvent('authGood');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('authFailed', data));
                }
            });
    }

    /**
   * @param {object} data
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
                    this.globalEventBus.dispatchEvent('authPassed');
                    this.localEventBus.dispatchEvent('authGood');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('registerFailed', data));
                }
            });
    }
}
