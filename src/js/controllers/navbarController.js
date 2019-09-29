import NavbarModel from '../models/navbarModel.js';
import NavbarView from '../views/navbar/navbarView.js';

/**
 * Класс Контроллер для элемента navbar
 * обеспечивает связь между моделью и представлением
 */
export default class NavbarController {
    /**
     * Создает контроллер
     * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
     * @param {object} root - элемент, в который будет рендериться страницы
     */
    constructor(globalEventBus = {}, root = {}) {
        this.navbarView = new NavbarView(globalEventBus, root);
        this.navbarModel = new NavbarModel(globalEventBus);
    }
}
