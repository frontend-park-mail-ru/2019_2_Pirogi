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
        this.data = {
            filmsForUser: [],
            filmsNew: [],
            trailers: [''],
        };

        this.localEventBus.addEventListener('indexOK',
            this.indexOK.bind(this));
    }

    indexOK(data = {}) {
        this.data = data;
        super.render(this.data);
        this.setEventListenersForTrailers();

        if (this.globalEvetBus.dispatchEvent('isAuth')) {
            const chat = document.querySelector('.js-chat-button');
            chat.addEventListener('click', () => {
                chat.classList.add('display-none');
                const iframe = document.querySelector('.js-iframe');
                iframe.classList.remove('display-none');
                iframe.innerHTML = '<iframe class="iframe" src="https://cinsear.ru/chat"/>';
                const chat2 = document.querySelector('.js-chat2-button');
                chat2.classList.remove('display-none');
                chat2.addEventListener('click', () => {
                    chat2.classList.add('display-none');
                    iframe.classList.add('display-none');
                    iframe.innerHTML = '';
                    chat.classList.remove('display-none');
                });
            });
        }
    }


    setEventListenersForTrailers() {
        this.trailersButttons = document.querySelectorAll('.js-trailer-button');
        if (this.trailersButttons[0]) {
            this.trailersButttons[0].classList.add('button_active');
        }
        this.trailersButttons.forEach((node) => {
            node.addEventListener('click', () => {
                const old = document.querySelector('.button_active');
                if (old) {
                    old.classList.remove('button_active');
                }
                node.classList.add('button_active');
                const frame = document.querySelector('iframe');
                frame.src = 'https://www.youtube.com/embed/' + this.data.trailers[node.id].trailer+'?autoplay=1&origin=https://cinsear.ru';
            });
        });

    }

    /**
     * Render the Index view
     * @param {Object} data
   */
    render() {
        super.render(this.data);


        const chat = document.querySelector('.js-chat-button');
        chat.addEventListener('click', () => {
            chat.classList.add('display-none');
            const iframe = document.querySelector('.js-iframe');
            iframe.classList.remove('display-none');
            iframe.innerHTML = '<iframe class="iframe" src="https://cinsear.ru/chat"/>';
            const chat2 = document.querySelector('.js-chat2-button');
            chat2.classList.remove('display-none');
            chat2.addEventListener('click', () => {
                chat2.classList.add('display-none');
                iframe.classList.add('display-none');
                iframe.innerHTML = '';
                chat.classList.remove('display-none');
            });
        });
        this.localEventBus.dispatchEvent('getIndex');
    }
}
