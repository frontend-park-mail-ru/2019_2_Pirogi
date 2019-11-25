import NavbarModel from '../models/navbarModel.js';
import NavbarView from '../views/navbar/navbarView.js';

/**
 * Creates a new navbar controller
 * @class
 * @type {NavbarController}
 */
export default class NavbarController {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {object} root
     */
    constructor(globalEventBus = {}, root = {}, router = {}) {
        this.navbarView = new NavbarView(globalEventBus, root);
        this.navbarModel = new NavbarModel(globalEventBus);

        globalEventBus.addEventListener('isAuth', () => {
            return this.navbarView.dataAuth.isAuth;
        });

        globalEventBus.addEventListener('searchEvent', () => {
            const searchInput = document.getElementById('js-search-input');
            if (searchInput.value) {
                router.route('/search','?query='+searchInput.value);
            } else {
                router.route('/search');
            }
        });
    }
}


