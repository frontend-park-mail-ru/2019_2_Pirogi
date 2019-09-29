import Api from "../libs/api";
/** class*/
export default class NavbarModel {
    /**
     * @param {object} globalEventBus
     */
    constructor(globalEventBus = {}) {
        this.globalEventBus = globalEventBus;

        this.globalEventBus.addEventListener('checkAuth', this.checkAuth.bind(this));
        this.globalEventBus.addEventListener('onLogoutClicked', this.logout.bind(this));
    }

    checkAuth() {
        Api.authCheck()
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('authGood');
                } else {
                    this.globalEventBus.dispatchEvent('logoutOk');
                }
            });
    }

    logout() {
        Api.logout()
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('logoutOk');
                }
            });
    }
}
