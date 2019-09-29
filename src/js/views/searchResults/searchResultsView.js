import View from '../../libs/view.js';
import template from './searchResult.tmpl.xml';

/** class*/
export default class SearchResultsView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root, template);

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
