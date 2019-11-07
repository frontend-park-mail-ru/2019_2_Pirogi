import View from '../../libs/view.js';
import template from './actorView.tmpl.xml';
import EventBus from '../../libs/eventBus';
import filmsTMPL from './actor.films.tmpl.xml';
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
        this.localTmpl = photoTMPL;
        this.tmplData  = {};

        this.localEventBus.addEventListener('ActorInfoOk',
            this.actorInfoOk.bind(this));
        this.localEventBus.addEventListener('filmListOk',
            this.filmListOk.bind(this));
    }

    /**
     * Render the actor wall
     * @method
     * @param {Object} data
     */
    renderWall(data = {}) {
        const wall = document.querySelector('.js-actor-wall');
        wall.innerHTML = this.localTmpl(data);
    }

    filmListOk(data) {
        this.actorData.filmsarray = data;
        this.renderWall(this.actorData);
    }

    actorInfoOk(data = {}) {
        super.render(data);
        this.actorData = data;

        if (this.tmplData.photo === 'photo') {
            this.localTmpl = photoTMPL;
        } else if (this.tmplData.awards === 'awards') {
            this.localTmpl = awardsTMPL;
        } else {
            this.tmplData.films = 'films';
            this.localTmpl = filmsTMPL;
            this.localEventBus.dispatchEvent('getFilmList',{limit:10, offset: 0});
        }
        this.renderWall(this.actorData);
    }
    /**
     * Render the Index view
     * @param {Object} data
     */
    render(data = {}) {
        this.tmplData = data;

        super.render(data);

        this.localEventBus.dispatchEvent('getActorInfo', data);
    }
}