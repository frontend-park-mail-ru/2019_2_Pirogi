import View from '../../libs/view.js';

/** class*/
export default class IndexView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   */
    constructor(localEventBus, globalEventBus = {}, root) {
        super(localEventBus, root);

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
