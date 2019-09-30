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
 * @class
 * @type {AdminController}
 */
export default class AdminController {
    /**
     * Администраторский контроллер
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(adminEvents);

        this.adminView = new AdminView(this.localEventBus, globalEventBus, root);
        this.adminModel = new AdminModel(this.localEventBus, globalEventBus);
    }
}
