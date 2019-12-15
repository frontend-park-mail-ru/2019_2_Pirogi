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
        this.globalEvetBus.addEventListener('newEventHappend',
            this.newEvent.bind(this));
    }


    newEvent(data = {}) {
        this.dataAuth.new_events_num = data.new_events_number;
    }
    /**
     * If auth is successful
     * @method
     * @param {Object} data
     */
    authPassed(data = {}) {
        this.dataAuth.isAuth = true;
        this.dataAuth.new_events_num = data.new_events_number;
        super.render(this.dataAuth);

        this.logoutButton = document.querySelector('.js-logout-button');
        this.logoutButton.addEventListener('click',
            () => this.globalEvetBus.dispatchEvent('onLogoutClicked'));

        const searchButton = document.getElementById('js-navbar-search');
        searchButton.addEventListener('click', () =>
            this.globalEvetBus.dispatchEvent('searchEvent'));

        const searchInput = document.getElementById('js-search-input');
        searchInput.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                this.globalEvetBus.dispatchEvent('searchEvent');
            }
        });
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
        const searchInput = document.getElementById('js-search-input');
        searchInput.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                this.globalEvetBus.dispatchEvent('searchEvent');
            }
        });
        const navbarlist = document.querySelector('.js-navbar-list-button');
        navbarlist.addEventListener('click', () => {
            const m = document.querySelector('.mobile-menu_display');
            if (!m) {
                const menu = document.querySelector('.mobile-menu');
                menu.classList.add('mobile-menu_display');

                const all = document.querySelector('.all-page');
                all.classList.add('all-page_display');
            } else {
                m.classList.remove('mobile-menu_display');
                const all = document.querySelector('.all-page_display');
                all.classList.remove('all-page_display');
            }
        });
    }

    /**
     * Render the navbar
     * @param {Object} data
     */
    render(data = {}) {
        if (data.isAuth === undefined) {
            this.globalEvetBus.dispatchEvent('checkAuth');
        }

        /*
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                this.globalEvetBus.dispatchEvent('searchEvent');
            }
        });*/
    }
}
