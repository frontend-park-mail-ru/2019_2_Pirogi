import '../index.sass';
import EventBus from './libs/eventBus.js';
import LoginController from './controllers/loginController.js';
import ProfileController from './controllers/profileController.js';
import FilmController from './controllers/filmController.js';
import SearchResultsController from './controllers/searchResultsController.js';
import IndexController from './controllers/indexController.js';
import AdminController from './controllers/adminController.js';
import NavbarController from './controllers/navbarController.js';
import Router from './libs/router.js';

document.addEventListener('DOMContentLoaded', () => {
    const globalEventBus = new EventBus([{}]);
    const header = document.querySelector('header');
    const body = document.querySelector('body');
    const router = new Router(body);

    // eslint-disable-next-line
    const navbarController = new NavbarController(globalEventBus, header);
    const loginController = new LoginController(globalEventBus, body, router);
    const profileController = new ProfileController(globalEventBus, body);
    const filmController = new FilmController(globalEventBus, body);
    const searchResultsController = new SearchResultsController(globalEventBus, body);
    const indexController = new IndexController(globalEventBus, body);
    const adminController = new AdminController(globalEventBus, body);

    router.add('/login', loginController.loginView);
    router.add('/profile', profileController.profileView);
    router.add('/film', filmController.filmView);
    router.add('/search', searchResultsController.searchResultsView);
    router.add('/admin', adminController.adminView);
    router.add('/', indexController.indexView);
    router.add('/new', indexController.indexView);
    router.add('/films', indexController.indexView);
    router.add('/ratings', indexController.indexView);
    router.add('/year', indexController.indexView);
    router.add('/genre', indexController.indexView);
    router.add('/actors', indexController.indexView);

    router.start();
});
