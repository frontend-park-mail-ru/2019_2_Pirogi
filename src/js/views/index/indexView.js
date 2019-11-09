import View from '../../libs/view.js';
import template from './indexView.tmpl.xml';
import EventBus from '../../libs/eventBus';


/**
 * Creates a new Index view
 * @class
 * @type {IndexView}
 */
export default class IndexView extends View {
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

        this.localEventBus.addEventListener('indexOK',
            this.indexOK.bind(this));
    }

    indexOK(data = {}) {
        super.render(data);
        this.setEventListenersForTrailers();
    }


    setEventListenersForTrailers() {
        this.trailersButttons = document.querySelectorAll('.js-trailer-button');

        this.trailersButttons.forEach((node) => {
            node.addEventListener('click', () => {
                const frame = document.querySelector('iframe');
                frame.src = 'http://www.youtube.com/embed/' + this.data.trailers[node.id].trailer+'?autoplay=1&origin=https://cinsear.ru';
            });
        });

    }

    /**
     * Render the Index view
     * @param {Object} data
   */
    render(data = {}) {
        super.render(data);

        this.localEventBus.dispatchEvent('getIndex');
    }
}
