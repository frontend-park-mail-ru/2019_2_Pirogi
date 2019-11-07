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
            })
            .catch(() => this.localEventBus.dispatchEvent('ActorInfoOk'));


    }
}
