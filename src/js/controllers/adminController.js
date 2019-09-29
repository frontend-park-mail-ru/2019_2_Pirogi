import EventBus from '../libs/eventBus.js';
import AdminModel from '../models/adminModel.js';
import AdminView from '../views/admin/adminView.js';

const adminEvents = [
    {key: 'myFilmAddEvent'},
    {key: 'filmAdded'},
    {key: 'filmAddFailed'},
    {key: 'addFilmCheck'},
];


/**
 * Класс контроллер для страницы администрирования
 * обеспечивает связь между моделью и представлением
 */
export default class AdminController {
    /**
     * Создает контроллер
     * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
     * @param {object} root - элемент, в который будет рендериться страницы
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(adminEvents);

        this.adminView = new AdminView(this.localEventBus, globalEventBus, root);
        this.adminModel = new AdminModel(this.localEventBus, globalEventBus);
    }
}
