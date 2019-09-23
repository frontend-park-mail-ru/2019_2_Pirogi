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
        this.isAuth = true;
        if (this.isAuth) {
            this.localEventBus.dispatchEvent('authGood');
        } else {
            this.localEventBus.dispatchEvent('authFailed');
        }
    }

    /**
   * @param {object} data
   */
    onRegisterCheck(data) {
        console.log('Checking register form....');
        console.log(data);
        this.isRegisterComplited = true;
        if (this.isRegisterComplited) {
            this.localEventBus.dispatchEvent('registerCompleted');
        } else {
            this.localEventBus.dispatchEvent('registerFailed');
        }
    }
}
