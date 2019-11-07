import Api from '../libs/api';
/**
 * Creates a new Index model
 * @type {IndexModel}
 */
export default class IndexModel {
    /**
     * @constructor
     * @param {EventBus} localEventBus
     * @param {EventBus} globalEventBus
     */
    constructor(localEventBus = {}, globalEventBus = {}) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('getIndex',
            this.getIndex.bind(this));
    }

    getIndex() {
        Api.getIndex()
            .then( (res) => {
                if (res.ok) {
                    res.json().then(data => this.localEventBus.dispatchEvent('indexOK', data));
                } else {
                    this.localEventBus.dispatchEvent('indexFailed');
                }
            });
    }
}
