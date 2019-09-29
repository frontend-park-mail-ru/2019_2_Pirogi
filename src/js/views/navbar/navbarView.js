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
            this.notAuth.bind(this));

    }

    authPassed(data = {}) {
        this.dataAuth.isAuth = true;
        this.dataAuth.userID = data.user_id;
        super.render(this.dataAuth);

        this.logoutButton = document.querySelector('.js-logout-button');
        this.logoutButton.addEventListener('click',
            () => this.globalEvetBus.dispatchEvent('onLogoutClicked'));
    }

    notAuth() {
        this.dataAuth.isAuth = false;
        super.render(this.dataAuth);
    }


    // eslint-disable-next-line no-unused-vars
    render(data = {}) {
        if (data.isAuth === undefined) {
            this.globalEvetBus.dispatchEvent('checkAuth');
        }
    }
}
