import EventBus from "../libs/eventBus";
import IndexModel from "../models/indexModel";
import IndexView from "../views/index/indexView";

const indexEvents = [
    {key:"", func: undefined}
];

export default class IndexController {
    constructor(globalEventBus = {}) {

        this.localEventBus = new EventBus(indexEvents);

        this.iView = new IndexView(this.localEventBus, globalEventBus);
        this.iModel = new IndexModel(this.localEventBus, globalEventBus);
    }
}