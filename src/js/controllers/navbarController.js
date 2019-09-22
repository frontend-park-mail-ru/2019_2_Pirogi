
import NavbarModel from '../models/navbarModel';
import NavbarView from '../views/navbar/navbarView';

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
