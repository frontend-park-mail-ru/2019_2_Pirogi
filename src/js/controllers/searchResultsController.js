import EventBus from '../libs/eventBus.js';
import SearchResultsModel from '../models/searchResultsModel.js';
import SearchResultsView from '../views/searchResults/searchResultsView.js';

const searchEvents = [];
/**
 * Класс Контроллер для страницы результатов поиска
 * обеспечивает связь между моделью и представлением
 */
export default class SearchResultsController {
    /**
     * Создает контроллер
     * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
     * @param {object} root - элемент, в который будет рендериться страницы
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(searchEvents);

        this.searchResultsView = new SearchResultsView(this.localEventBus,
            globalEventBus,
            root);
        this.searchResultsModel = new SearchResultsModel(this.localEventBus,
            globalEventBus);
    }
}
