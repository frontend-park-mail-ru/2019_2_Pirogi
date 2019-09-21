import EventBus from '../libs/eventBus';
import AdminModel from '../models/adminModel';
import AdminView from '../views/admin/adminView';

const adminEvents = [
    {key:'myFilmAddEvent'},
    {key:'filmAdded'},
    {key:'filmAddFailed'},
    {key:'addFilmCheck'},
];

export default class AdminController {
    constructor(globalEventBus = {}) {
        this.localEventBus = new EventBus(adminEvents);

        this.adminView = new AdminView(this.localEventBus, globalEventBus);
        this.adminModel = new AdminModel(this.localEventBus, globalEventBus);
    }
}