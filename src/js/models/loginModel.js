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
        console.log('Checking login and password...');
        console.log(data);

        // тут первичная валидация

        Api.login(data)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('authGood');
                } else {
                    res.json().then(data=>this.localEventBus.dispatchEvent('authFailed', data));
                }
            });
    }

    /**
   * @param {object} data
   */
    onRegisterCheck(data) {
        console.log('Checking register form....');
        console.log(data);

        // тут первичная валидация

        Api.register(data)
            .then((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('registerCompleted');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('registerFailed', data));
                }
            });
    }
}
