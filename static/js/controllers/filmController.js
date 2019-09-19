import EventBus from "../libs/eventBus"
import FilmModel from "../models/filmModel";
import FilmView from "../views/film/filmView";

export default class FilmController {
    constructor(globalEventBus) {
        this.localEventBus = new EventBus();

        this.fModel = FilmModel(this.localEventBus, globalEventBus);
        this.fView = FilmView(this.localEventBus, globalEventBus);
    }
}