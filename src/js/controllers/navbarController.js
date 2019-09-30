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
    constructor(globalEventBus = {}, root = {}) {
        this.navbarView = new NavbarView(globalEventBus, root);
        this.navbarModel = new NavbarModel(globalEventBus);
    }
}
