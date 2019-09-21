import EventBus from '../libs/eventBus'
import FilmModel from '../models/filmModel';
import FilmView from '../views/film/filmView';

const filmEvents = [
    {key:'myReviewEvent'},
    {key:'addMyNewReview'},
    {key:'reviewCheck'},
];

export default class FilmController {
    constructor(globalEventBus = {}) {
        this.localEventBus = new EventBus(filmEvents);

        this.filmModel = FilmModel(this.localEventBus, globalEventBus);
        this.filmView = FilmView(this.localEventBus, globalEventBus);
    }
}
