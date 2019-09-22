import View from '../../libs/view.js';
// import template from './profile.tmpl.js'

/** class*/
export default class ProfileView extends View {
  /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
  constructor(localEventBus, globalEventBus = {}) {
    super(localEventBus);

    this.localEventBus = localEventBus;
    this.globalEvetBus = globalEventBus;
  }

  /**
   * @param {object} root
   * @param {object} data
   */
  render(root, data) {
    super.render(root, data);
  }
}
