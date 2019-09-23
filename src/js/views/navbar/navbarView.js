import View from '../../libs/view.js';

/** class*/
export default class NavbarView extends View {
    /**
     * @param {object} globalEventBus
     */
    constructor(globalEventBus) {
        super(globalEventBus);

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
