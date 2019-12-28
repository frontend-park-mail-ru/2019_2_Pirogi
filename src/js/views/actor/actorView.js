import View from '../../libs/view.js';
import template from './actorView.tmpl.xml';
import EventBus from '../../libs/eventBus';
import filmsTMPL from './actor.films.tmpl.xml';


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
        this.localTmpl = filmsTMPL;
        this.tmplData  = {
            films: '',
            awards: '',
            photo: '',
        };
        this.actorData = {};
        this.actorData.person = {
            name: '',
            images: 'default.png',
        };
        this.actorData.params = {
            is_auth: false,
            is_subscribed: false,
        };

        this.localEventBus.addEventListener('ActorInfoOk',
            this.actorInfoOk.bind(this));
        this.localEventBus.addEventListener('filmListOk',
            this.filmListOk.bind(this));
        this.localEventBus.addEventListener('subOk',
            this.subOk.bind(this));
        this.localEventBus.addEventListener('unsubOk',
            this.unsubOk.bind(this));
    }

    subOk() {
        this.actorData.params.is_subscribed = true;
        this.addListenersForSubscribe();
    }
    unsubOk() {
        this.actorData.params.is_subscribed = false;
        this.addListenersForSubscribe();
    }

    /**
     * Render the actor wall
     * @method
     */
    renderWall() {
        const wall = document.querySelector('.js-actor-wall');
        wall.innerHTML = this.localTmpl(this.actorData.person);
    }

    filmListOk(data) {
        this.actorData.person.filmsarray = data;
        this.renderWall();
    }

    chooseWall() {
       
        this.tmplData.films = 'films';
        this.localTmpl = filmsTMPL;
        this.localEventBus.dispatchEvent('getFilmList',{
            limit:10,
            offset: 0,
            personsids: this.actorData.person.id,
            order_by: 'year'
        });

    }

    actorInfoOk(data = {}) {
        this.actorData = data;
        super.render(this.actorData.person);

        this.chooseWall();
        this.renderWall();
        this.addListenersForSubscribe();
    }

    addListenersForSubscribe() {
        let subButton = document.querySelector('.js-subscribe-button');
        const parent = subButton.parentElement;
        parent.removeChild(subButton);
        subButton = document.createElement('input');
        subButton.classList.add('button');
        subButton.classList.add('js-subscribe-button');
        if (!this.actorData.params.is_auth) {
            subButton.classList.add('display-none');
        } else if (this.actorData.params.is_subscribed) {
            subButton.value = 'Отписаться';
            subButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('unsubscribe', this.actorData.person);
            });
        } else {
            subButton.value = 'Подписаться';
            subButton.addEventListener('click', () => {
                this.localEventBus.dispatchEvent('subscribe', this.actorData.person);
            });
        }
        parent.appendChild(subButton);
    }

    /**
     * Render the Index view
     * @param {Object} data
     */
    render(data = {}) {
        /*if ( data.id === this.tmplData.id && document.querySelector('.js-actor-wall')) {
            this.tmplData = data;
            this.chooseWall();
            this.renderWall();
            return;
        }*/
        this.tmplData = data;

        super.render(this.actorData.person);
        this.renderWall();

        this.addListenersForSubscribe();
        this.localEventBus.dispatchEvent('getActorInfo', data);
    }
}