import View from '../../libs/view.js';
import template from './actorView.tmpl.xml';
import EventBus from '../../libs/eventBus';
import filmsTMPL from './actorView.tmpl.xml';
import photoTMPL from './actor.photo.tmpl.xml';
import awardsTMPL from './actor.awards.tmpl.xml';


/**
 * Creates a new Actor view
 * @class
 * @type {IndexView}
 */
export default class ActorView extends View {
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
    /**
     * Render the Index view
     * @param {Object} data
     */
    render(data = {}) {
        if (data['films'] === '') {
            super.template = filmsTMPL;
        } else if (data['photo'] === '') {
            super.template = photoTMPL;
        } else if (data['awards'] === '') {
            super.template = awardsTMPL;
        } else {
            super.template = filmsTMPL;
        }
        super.render(data);
    }
}