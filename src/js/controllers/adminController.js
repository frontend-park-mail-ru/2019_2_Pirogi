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
 * Creates a new Admin controller
 * Класс контроллер для страницы администрирования
 * обеспечивает связь между моделью и представлением
 * @class
 * @type {AdminController}
 */
export default class AdminController {
    /**
     * Создает контроллер
     * @constructor
     * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
     * @param {object} root - элемент, в который будет рендериться страницы
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(adminEvents);

        this.adminView = new AdminView(this.localEventBus, globalEventBus, root);
        this.adminModel = new AdminModel(this.localEventBus, globalEventBus);
    }
}
