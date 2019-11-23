import View from '../../libs/view';
import EventBus from '../../libs/eventBus';
import template from './chatView.tmpl.xml';
//import tmpladmin from './chatView.admin.tmpl.xml';


/**
 * Creates a new Index view
 * @class
 * @type {IndexView}
 */
export default class ChatView extends View {
    /**
     * @constructor
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     * @param {Object} root
     */
    constructor(localEventBus = EventBus, globalEventBus = EventBus, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;
    }

    hide() {
        this.localEventBus.dispatchEvent('closeWS');
        const navbar = document.querySelector('header');
        navbar.classList.remove('display-none');
    }

    render(data = {}) {
        super.render(data);
        this.localEventBus.dispatchEvent('createWS');
        const navbar = document.querySelector('header');
        navbar.classList.add('display-none');
    }
}