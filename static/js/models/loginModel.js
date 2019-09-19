
export default class LoginModel {
    constructor(localEventBus, globalEventBus) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener("OnAuthCheck", this.OnAuthCheck().bind(this))
    }

/*
- проверяет авторизацию 
 */
OnAuthCheck(login, password) {
    console.log("Checking login and password...")
    //проверка правильности логина и пароля
    const isAuth = true;
    if (isAuth) {
        this.localEventBus.callEvent('AuthGood')
    } else {
        this.localEventBus.callEvent('AuthFailed')
    }

}
}