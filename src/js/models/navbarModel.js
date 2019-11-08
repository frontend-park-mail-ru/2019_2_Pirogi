import Api from '../libs/api';

/**
 *  Creates a new navbar model
 *  @class
 *  @type {NavbarModel}
 */
export default class NavbarModel {
    /**
     * Creates local and global EventBuses. Handle Events
     * @constructor
     * @param {EventBus} globalEventBus
     * @listens checkAuth
     * @listens logout
     */
    constructor(globalEventBus = {}) {
        this.globalEventBus = globalEventBus;

        this.globalEventBus.addEventListener('checkAuth', this.checkAuth.bind(this));
        this.globalEventBus.addEventListener('onLogoutClicked', this.logout.bind(this));
    }


    /**
     * Обработчик проверки авторизации
     * @static
     * @method
     */
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

    /**
     * Обработчик выхода из системы
     * @static
     * @method
     */
    logout() {
        Api.logout()
            .then((res) => {
                if (res.ok) {
                    this.globalEventBus.dispatchEvent('logoutOk');
                }
            });
    }
}
