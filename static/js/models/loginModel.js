export default class LoginModel {
    constructor(localEventBus, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('onAuthCheck', this.onAuthCheck.bind(this));
        this.localEventBus.addEventListener('onRegisterCheck', this.onRegisterCheck.bind(this))
    }


    onAuthCheck(data) {
        console.log('Checking login and password...');
        this.isAuth = true;
        if (this.isAuth) {
            this.localEventBus.dispatchEvent('authGood')
        } else {
            this.localEventBus.dispatchEvent('authFailed')
        }

    }

    onRegisterCheck(data) {
        console.log('Checking register form....');
        this.isRegisterComplited = true;
        if (this.isRegisterComplited) {
            this.localEventBus.dispatchEvent('registerCompleted');
        } else {
            this.localEventBus.dispatchEvent('registerFailed');
        }
    }
}