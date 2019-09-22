import View from '../../libs/view';

/** class*/
export default class SearchResultsView extends View {
  /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
  constructor(localEventBus, globalEventBus) {
    super(localEventBus);

    this.localEventBus = localEventBus;
    this.globalEventBus = globalEventBus;
  }
  /**
   * @param {object} root
   * @param {object} data
   */
  render(root, data = {}) {
    console.log('rendering searchResults page');
    super.render(root, data);
  }
}
