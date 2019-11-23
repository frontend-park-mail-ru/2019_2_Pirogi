import EventBus from '../libs/eventBus';
import ChatView from '../views/chat/chatView';
import ChatModel from '../models/chatModel';

const chatEvents = [
];
/**
 *Creates a new Index controller
 * @class
 * @type {IndexController}
 */
export default class ChatController {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = EventBus, root = EventBus) {
        this.localEventBus = new EventBus(chatEvents);
        this.chatView = new ChatView(this.localEventBus, globalEventBus, root);
        this.chatModel = new ChatModel(this.localEventBus, globalEventBus);

        this.localEventBus.addEventListener('createWS', () => this.createWS());
        this.localEventBus.addEventListener('closeWS', () => this.closeWS());
    }


    createWS() {
        this.socket = new WebSocket('wss://cinsear.ru/ws/');

        this.socket.onopen = () => {
            console.log('WebSocket [open] Соединение установлено');

            const send = document.getElementById('js-message-sendler');
            send.addEventListener('click', () => {
                const input = document.getElementById('js-message-input');
                if (input.value) {
                    const data = {
                        body: input.value,
                    };
                    console.log('WebSocket Отправляем данные на сервер' + JSON.stringify(data));
                    this.socket.send(JSON.stringify(data));

                    const date = new Date();
                    const m = document.createElement('div');
                    m.classList.add('mes');
                    m.classList.add('mes_user');
                    m.innerHTML = '<div class="mes__author">Я</div><div class="mes__body">' +
                        input.value + '</div> <div class="mes__date">' + date + '</div>';
                    const messages = document.querySelector('.chat__messages');
                    messages.appendChild(m);
                    input.value = '';
                }
            });
        };

        this.socket.onmessage = (event) => {
            console.log(`WebSocket[message] Данные получены с сервера: ${event.data}`);

            const date = new Date();
            const m = document.createElement('div');
            m.classList.add('mes');
            m.classList.add('mes_admin');
            m.innerHTML = '<div class="mes__author">Поддержка</div><div class="mes__body">' +
                 event.data.body + '</div> <div class="mes__date">' + date + '</div>';
            const messages = document.querySelector('.chat__messages');
            messages.appendChild(m);
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`WebSocket [close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('WebSocket:[close] Соединение прервано');
            }
        };

        this.socket.onerror = (error) => {
            console.log('WebSocket: [error] ', error);
        };
    }

    closeWS() {
        this.socket.close();
    }
}
