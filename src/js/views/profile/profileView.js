import View from '../../libs/view.js';
// import template from './profile.tmpl.js'

/** class*/
export default class ProfileView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
     * @param {object} root
   */
    constructor(localEventBus, globalEventBus = {}, root) {
        super(localEventBus, root);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;
    }

    /**

   * @param {object} data
   */
    render(data) {
        super.render(data);
    }
}
