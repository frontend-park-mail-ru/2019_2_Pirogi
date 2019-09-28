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
        // тут первичная валидация

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
        // тут первичная валидация

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
