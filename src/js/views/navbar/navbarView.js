import View from '../../libs/view.js';
import template from './navbarView.tmpl.xml';
import EventBus from '../../libs/eventBus';


/**
 * Creates a new Navbar view
 * @class
 * @type {NavbarView}
 * @listens 'authGood'
 * @listens 'logoutOk'
 */
export default class NavbarView extends View {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {object} root
     */
    constructor(globalEventBus = EventBus, root = {}) {
        super(globalEventBus, root, template);

        this.globalEvetBus = globalEventBus;
        this.dataAuth = {};

        this.globalEvetBus.addEventListener('authGood',
            this.authPassed.bind(this));
        this.globalEvetBus.addEventListener('logoutOk',
            this.notAuth.bind(this));
    }

    /**
     * If auth is successful
     * @method
     * @param {Object} data
     */
    authPassed(data = {}) {
        this.dataAuth.isAuth = true;
        this.dataAuth.userID = data.user_id;
        super.render(this.dataAuth);

        this.logoutButton = document.querySelector('.js-logout-button');
        this.logoutButton.addEventListener('click',
            () => this.globalEvetBus.dispatchEvent('onLogoutClicked'));

        const searchButton = document.getElementById('js-navbar-search');
        searchButton.addEventListener('click',
            this.globalEvetBus.dispatchEvent('searchEvent'));
    }

    /**
     * If auth is unsuccessful
     * @method
     */
    notAuth() {
        this.dataAuth.isAuth = false;
        super.render(this.dataAuth);
        const searchButton = document.getElementById('js-navbar-search');
        searchButton.addEventListener('click', () =>
            this.globalEvetBus.dispatchEvent('searchEvent'));
    }

    /**
     * Render the navbar
     * @param {Object} data
     */
    render(data = {}) {
        if (data.isAuth === undefined) {
            this.globalEvetBus.dispatchEvent('checkAuth');
        }
    }
}
