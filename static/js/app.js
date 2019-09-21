import EventBus from './libs/eventBus.js'
import LoginController from './controllers/loginController'
import ProfileController from './controllers/profileController'
import FilmController from './controllers/filmController';
import SearchResultsController from './controllers/searchResultsController';
import IndexController from './controllers/indexController';
import AdminController from './controllers/adminController';

document.addEventListener('DOMContentLoaded',() => {
    const globalEventBus = new EventBus([{}]);

    const loginController = new LoginController(globalEventBus);
    const profileController = new ProfileController(globalEventBus);
    const filmController = new FilmController(globalEventBus);
    const searchResultsController = new SearchResultsController(globalEventBus);
    const indexController = new IndexController(globalEventBus);
    const adminController = new AdminController(globalEventBus);

});

