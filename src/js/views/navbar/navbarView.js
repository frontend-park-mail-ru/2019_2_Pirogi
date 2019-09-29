import View from '../../libs/view.js';
import template from './navbarView.tmpl.xml';

/** class*/
export default class NavbarView extends View {
    /**
     * @param {object} globalEventBus
     * @param {object} root
     */
    constructor(globalEventBus = {}, root = {}) {
        super(globalEventBus, root, template);

        this.globalEvetBus = globalEventBus;
        this.dataAuth = {};

        this.globalEvetBus.addEventListener('authGood',
            this.authPassed.bind(this));
        this.globalEvetBus.addEventListener('logoutOk',
            this.logoutOk.bind(this));
        this.globalEvetBus.addEventListener('auth',
            this.auth.bind(this));
        this.globalEvetBus.addEventListener('notAuth',
            this.notAuth.bind(this));
    }

    auth() {
        this.dataAuth.isAuth = true;
    }

    notAuth() {
        this.dataAuth.isAuth = false;
    }

    authPassed() {
        this.dataAuth.isAuth = true;
        super.render(this.dataAuth);
    }

    logoutOk() {
        this.dataAuth.isAuth = false;
        super.render(this.dataAuth);
    }

    /**
     * @param {object} data
     */
    render(data) {
        this.dataAuth = data || this.globalEvetBus.dispatchEvent('checkAuth');
        super.render(this.dataAuth);

        if (this.dataAuth.isAuth) {
            this.logoutButton = document.querySelector('.js-logout-button');
            this.logoutButton.addEventListener('click',
                () => this.globalEvetBus.dispatchEvent('onLogoutClicked'));
        }
    }
}
