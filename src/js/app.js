/* eslint-disable */
import EventBus from './libs/eventBus.js';
import LoginController from './controllers/loginController.js';
import ProfileController from './controllers/profileController.js';
import FilmController from './controllers/filmController.js';
import SearchResultsController from './controllers/searchResultsController.js';
import IndexController from './controllers/indexController.js';
import AdminController from './controllers/adminController.js';
import NavbarController from './controllers/navbarController.js';
import Router from './libs/router';

document.addEventListener('DOMContentLoaded', () => {
    const globalEventBus = new EventBus([{}]);
    const header = document.querySelector('<header>');
    const navbarController = new NavbarController(globalEventBus, header);

    const body = document.querySelector('<body>');

    const loginController = new LoginController(globalEventBus, body);
    const profileController = new ProfileController(globalEventBus, body);
    const filmController = new FilmController(globalEventBus, body);
    const searchResultsController = new SearchResultsController(globalEventBus, body);
    const indexController = new IndexController(globalEventBus, body);
    const adminController = new AdminController(globalEventBus, body);

    const router = new Router(body);

    router.add('/login', body, loginController.loginView);
    router.add('/profile', body, profileController.profileView);
    router.add('/film', body, filmController.filmView);
    router.add('/search', body, searchResultsController.searchResultsView);
    router.add('/admin', body, adminController.adminView);
    router.add('/', body, indexController.indexView);
    router.add('/new', body, indexController.indexView);
    router.add('/films', body, indexController.indexView);
    router.add('/ratings', body, indexController.indexView);
    router.add('/year', body, indexController.indexView);
    router.add('/genre', body, indexController.indexView);
    router.add('/actors', body, indexController.indexView);

    router.start();
});
