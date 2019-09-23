import NavbarModel from '../models/navbarModel.js';
import NavbarView from '../views/navbar/navbarView.js';

/** class*/
export default class NavbarController {
    /**
     * @param {object} globalEventBus
     */
    constructor(globalEventBus = {}) {
        this.navbarView = new NavbarView(globalEventBus);
        this.navbarModel = new NavbarModel(globalEventBus);
    }
}
