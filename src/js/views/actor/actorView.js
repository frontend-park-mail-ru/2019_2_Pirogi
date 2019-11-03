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

        this.localEventBus.addEventListener('ActorInfoOk',
            this.actorInfoOk.bind(this));
        this.localEventBus.addEventListener('filmListOk',
            this.filmListOk.bind(this));
    }

    filmListOk(data) {
        this.actorData.films = data;
        super.render(this.actorData);
    }
    actorInfoOk(data = {}) {
        super.render(data);
        if (this.actorData.films === 'films') {
            this.localEventBus.dispatchEvent('getFilmList',{limit:1, offset: 0});
        }

        this.actorData = data;
    }
    /**
     * Render the Index view
     * @param {Object} data
     */
    render(data = {}) {
        this.actorData = data;
        if (data.films === 'films') {
            super.template = filmsTMPL;
        } else if (data.photo === 'photo') {
            super.template = photoTMPL;
        } else if (data.awards === 'awards') {
            super.template = awardsTMPL;
        } else {
            super.template = filmsTMPL;
        }
        super.render(data);

        this.localEventBus.dispatchEvent('getActorInfo', data);
    }
}