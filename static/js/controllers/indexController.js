import EventBus from '../libs/eventBus';
import IndexModel from '../models/indexModel';
import IndexView from '../views/index/indexView';

const indexEvents = [
    {key:''}
];

export default class IndexController {
    constructor(globalEventBus = {}) {

        this.localEventBus = new EventBus(indexEvents);

        this.indexView = new IndexView(this.localEventBus, globalEventBus);
        this.indexModel = new IndexModel(this.localEventBus, globalEventBus);
    }
}