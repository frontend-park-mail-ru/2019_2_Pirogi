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
        if (!validateEmail(data.email) || !validatePassword(data.password)) {
            // render errors
            return;
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
        if (!validateEmail(data.email)
            || !validatePassword(data.password1)
            || (data.password1 !== data.password2)
            || !validateName(data.name)) {
            // render errors
            return;
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
