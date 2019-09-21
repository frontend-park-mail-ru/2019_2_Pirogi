import View from '../../libs/view.js'
//import template from './profile.tmpl.js'


export default class ProfileView extends View {
    constructor(localEventBus, globalEventBus = {}) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

    }

    render(root, data) {
        super.render(root, data);
    }
}