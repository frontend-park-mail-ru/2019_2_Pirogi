import View from '../../libs/view.js';

/** class*/
export default class SearchResultsView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }
    /**
   * @param {object} data
   */
    render(data = {}) {
        console.log('rendering searchResults page');
        super.render(data);
    }
}
