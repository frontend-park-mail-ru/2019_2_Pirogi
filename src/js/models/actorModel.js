import Api from '../libs/api';
/**
 * Creates a new Actor model
 * @type {IndexModel}
 */
export default class ActorModel {
    /**
     * @constructor
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('getActorInfo',
            this.getActorInfo.bind(this));
        this.localEventBus.addEventListener('getFilmList',
            this.getFilmList.bind(this));
        this.localEventBus.addEventListener('unsubscribe',
            this.unsubscribe.bind(this));
        this.localEventBus.addEventListener('subscribe',
            this.subscribe.bind(this));
    }

    unsubscribe(data = {}) {
        Api.unsubscribe(data)
            .then ((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('unsubOk');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('unsubFailed', data));
                }
            });
    }

    subscribe(data = {}) {
        Api.subscribe(data)
            .then ((res) => {
                if (res.ok) {
                    this.localEventBus.dispatchEvent('subOk');
                } else {
                    res.json().then(data => this.localEventBus.dispatchEvent('subFailed', data));
                }
            });
    }

    getFilmList(data = {}) {
        Api.getList(data)
            .then( (res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('filmListOk', data));
                } else {
                    this.localEventBus.dispatchEvent('filmListFailed');
                }
            });
    }

    getActorInfo(data = {}) {
        Api.getPersonInfo(data)
            .then((res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('ActorInfoOk', data));
                } else {
                    this.localEventBus.dispatchEvent('ActorInfoFailed');
                }
            });


    }
}
