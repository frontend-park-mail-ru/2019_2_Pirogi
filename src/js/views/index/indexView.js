import View from '../../libs/view.js';
import template from './indexView.tmpl.xml';

/** class*/
export default class IndexView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;
    }
    /**
   * @param {object} data
   */
    render(data = {}) {
        super.render(data);
    }
}
