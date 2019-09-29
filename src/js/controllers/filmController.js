import EventBus from '../libs/eventBus.js';
import FilmModel from '../models/filmModel.js';
import FilmView from '../views/film/filmView.js';

const filmEvents = [
    {key: 'myReviewEvent'},
    {key: 'addMyNewReview'},
    {key: 'reviewCheck'},
];
/**
 * Класс Контроллер для страницы фильма
 * обеспечивает связь между моделью и представлением
 */
export default class FilmController {
    /**
   * Создает контроллер
   * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
   * @param {object} root - элемент, в который будет рендериться страницы
   */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(filmEvents);

        this.filmModel = new FilmModel(this.localEventBus, globalEventBus);
        this.filmView = new FilmView(this.localEventBus, globalEventBus, root);
    }
}
