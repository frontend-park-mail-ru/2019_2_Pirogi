import EventBus from "../libs/eventBus"
import FilmModel from "../models/filmModel";
import FilmView from "../views/film/filmView";

const filmEvents = [
    {key:"myReviewEvent", func: undefined},
    {key:"AddMyNewReview", func: undefined},
    {key:"ReviewCheck", func: undefined},
];

export default class FilmController {
    constructor(globalEventBus) {
        this.localEventBus = new EventBus(filmEvents);

        this.fModel = FilmModel(this.localEventBus, globalEventBus);
        this.fView = FilmView(this.localEventBus, globalEventBus);
    }
}