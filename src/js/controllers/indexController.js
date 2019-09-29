import EventBus from '../libs/eventBus.js';
import IndexModel from '../models/indexModel.js';
import IndexView from '../views/index/indexView.js';

const indexEvents = [];
/**
 * Класс контроллер для главной страницы
 * обеспечивает связь между моделью и представлением
 */
export default class IndexController {
    /**
     * Создает контроллер
     * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
     * @param {object} root - элемент, в который будет рендериться страницы
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(indexEvents);

        this.indexView = new IndexView(this.localEventBus, globalEventBus, root);
        this.indexModel = new IndexModel(this.localEventBus, globalEventBus);
    }
}
