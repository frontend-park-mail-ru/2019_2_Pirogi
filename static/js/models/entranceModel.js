export default class EntranceModel {
    constructor(localEventBus, globalEventBus) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener("OnAuthCheck", this.OnAuthCheck.bind(this));
        this.localEventBus.addEventListener("OnRegisterCheck", this.OnRegisterCheck.bind(this))
    }


    OnAuthCheck(login, password) {
        console.log("Checking login and password...");
        //проверка правильности логина и пароля
        const isAuth = true;
        if (isAuth) {
            this.localEventBus.callEvent('AuthGood')
        } else {
            this.localEventBus.callEvent('AuthFailed')
        }

    }

    OnRegisterCheck(login, nickname, password, repeatPassword) {
        console.log("Checking register form....");
        const isRegisterComplited = true;
        if (isRegisterComplited) {
            this.localEventBus.callEvent('RegisterCompleted');
        } else {
            this.localEventBus.callEvent('RegisterFailed');
        }
    }
}