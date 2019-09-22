import EventBus from '../libs/eventBus';
import IndexModel from '../models/indexModel';
import IndexView from '../views/index/indexView';

const indexEvents = [
  {key: ''},
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
