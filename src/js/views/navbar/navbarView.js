import View from '../../libs/view.js';

/** class*/
export default class NavbarView extends View {
    /**
     * @param {object} globalEventBus
     */
    constructor(globalEventBus, root) {
        super(globalEventBus, root);

        this.globalEvetBus = globalEventBus;
    }
    /**
     * @param {object} data
     */
    render(data) {
        super.render(data);
    }
}
