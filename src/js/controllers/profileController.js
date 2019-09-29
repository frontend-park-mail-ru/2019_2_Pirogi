import EventBus from '../libs/eventBus.js';
import ProfileView from '../views/profile/profileView.js';
import ProfileModel from '../models/profileModel.js';

const profileEvents = [];

/**
 * Класс Контроллер для страницы профиля пользователя
 * обеспечивает связь между моделью и представлением
 */
export default class ProfileController {
    /**
     * Создает контроллер
     * @param {object} globalEventBus - обеспечивает связь с глобальными событиями
     * @param {object} root - элемент, в который будет рендериться страницы
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(profileEvents);

        this.profileView = new ProfileView(this.localEventBus, globalEventBus, root);
        this.profileModel = new ProfileModel(this.localEventBus, globalEventBus);
    }
}
