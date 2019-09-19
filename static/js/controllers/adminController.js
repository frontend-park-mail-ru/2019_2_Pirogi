import EventBus from "../libs/eventBus";
import AdminModel from "../models/adminModel";
import AdminView from "../views/admin/adminView";

const adminEvents = [
    {key:"myFilmAddEvent", func: undefined},
    {key:"FilmAdded", func: undefined},
    {key:"FilmAddFailed", func: undefined},
    {key:"AddFilmCheck", func: undefined},
];

export default class AdminController {
    constructor(globalEventBus = {}) {

        this.localEventBus = new EventBus(adminEvents);

        this.aView = new AdminView(this.localEventBus, globalEventBus);
        this.aModel = new AdminModel(this.localEventBus, globalEventBus);
    }
}