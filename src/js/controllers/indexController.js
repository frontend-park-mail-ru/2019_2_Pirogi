import EventBus from '../libs/eventBus.js';
import IndexModel from '../models/indexModel.js';
import IndexView from '../views/index/indexView.js';

const indexEvents = [
  {},
];
/** class*/
export default class IndexController {
  /**
   * @param {object} globalEventBus
   */
  constructor(globalEventBus = {}) {
    this.localEventBus = new EventBus(indexEvents);

    this.indexView = new IndexView(this.localEventBus, globalEventBus);
    this.indexModel = new IndexModel(this.localEventBus, globalEventBus);
  }
}
