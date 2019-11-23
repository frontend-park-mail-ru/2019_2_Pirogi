export default class MyWebSocket {
    constructor() {
        this.socket = null;
    }

    open() {
        if (this.socket !== null) return;
        this.socket = new WebSocket('wss://cinsear.ru/ws/');
        this.socket.onopen = (data) => console.log(data);
        this.socket.onclose = () => this.close();
        this.socket.onerror = (data) => console.log(data);
        this.socket.onmessage = (data) => {
            const d = JSON.parse(data.data);
            const m = document.createElement('div');
            let author = '';
            m.classList.add('mes');
            if (d.author) {
                m.classList.add('mes_admin')
                author = 'Поддержка';
            } else {
                m.classList.add('mes_user');
                author = 'Я';
            }

            m.innerHTML = '<div class="mes__author"> + author + </div><div class="mes__body">' +
                d.body + '</div> <div class="mes__date">' + d.datetime + '</div>';

            const messages = document.querySelector('.chat__messages');
            messages.appendChild(m);
            console.log(data);
        };
    }
    //
    // onopen() {
    //     this.socket.onopen = (data) => console.log(data);
    // }
    //
    // onclose() {
    //     this.socket.onclose = (data) => console.log(data);
    // }
    //
    // onerror() {
    //     this.socket.onerror = (data) => console.log(data);
    // }
    //
    // onmessage() {
    //     this.socket.onmessage = (data) => {
    //         const date = new Date();
    //         const m = document.createElement('div');
    //         m.classList.add('mes');
    //         m.classList.add('mes_admin');
    //         m.innerHTML = '<div class="mes__author">Поддержка</div><div class="mes__body">' +
    //             data.data.body + '</div> <div class="mes__date">' + date + '</div>';
    //         const messages = document.querySelector('.chat__messages');
    //         messages.appendChild(m);
    //         console.log(data);
    //     };
    // }

    send(data) {
        this.socket.send(JSON.stringify({body: data}));
    }

    close() {
        this.socket.close();
        console.log(this.socket);
        this.socket = null;
    }
};