import EventBus from '../libs/eventBus';
import FilmModel from '../models/filmModel';
import FilmView from '../views/film/filmView';

const filmEvents = [
  {key: 'myReviewEvent'},
  {key: 'addMyNewReview'},
  {key: 'reviewCheck'},
];
/** class*/
export default class FilmController {
  /**
   * @param {object} globalEventBus
   */
  constructor(globalEventBus = {}) {
    this.localEventBus = new EventBus(filmEvents);

    this.filmModel = new FilmModel(this.localEventBus, globalEventBus);
    this.filmView = new FilmView(this.localEventBus, globalEventBus);
  }
}
