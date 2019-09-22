import View from '../../libs/view';

/** class*/
export default class IndexView extends View {
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
