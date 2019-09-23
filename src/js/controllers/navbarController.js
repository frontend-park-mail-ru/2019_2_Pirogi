import NavbarModel from '../models/navbarModel.js';
import NavbarView from '../views/navbar/navbarView.js';

/** class*/
export default class NavbarController {
    /**
     * @param {object} globalEventBus
     */
    constructor(globalEventBus = {}, root) {
        this.navbarView = new NavbarView(globalEventBus, root);
        this.navbarModel = new NavbarModel(globalEventBus);
    }
}
