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
import GenresController from './controllers/genresController';
import RatingsController from './controllers/ratingsController';

document.addEventListener('DOMContentLoaded', () => {
    // Проверим, что эта технология доступна в браузере
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./dist/sw.js')
            .then((reg) => {
                // регистрация сработала
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                // регистрация прошла неудачно
                console.log('Registration failed with ' + error);
            });
    }

    const globalEventBus = new EventBus([{}]);
    const header = document.querySelector('header');
    const body = document.querySelector('.js-append-tmpl');
    const bodyForRouter = document.querySelector('body');
    const router = new Router(bodyForRouter);

    const navbarController = new NavbarController(globalEventBus, header);
    const loginController = new LoginController(globalEventBus, body, router);
    const profileController = new ProfileController(globalEventBus, body);
    const filmController = new FilmController(globalEventBus, body);
    const searchResultsController = new SearchResultsController(globalEventBus, body);
    const indexController = new IndexController(globalEventBus, body);
    const adminController = new AdminController(globalEventBus, body);
    const genresController = new GenresController(globalEventBus, body);
    const ratingsController = new RatingsController(globalEventBus, body);

    navbarController.navbarView.render();

    router.add('/login', loginController.loginView);
    router.add('/profile', profileController.profileView);
    router.add('/film/', filmController.filmView);
    router.add('/search', searchResultsController.searchResultsView);
    router.add('/admin', adminController.adminView);
    router.add('/', indexController.indexView);
    router.add('/new', indexController.indexView);
    router.add('/films', indexController.indexView);
    router.add('/ratings', indexController.indexView);
    router.add('/year', indexController.indexView);
    router.add('/genre', indexController.indexView);
    router.add('/actors', indexController.indexView);
    router.add('/films', genresController.genresView);
    router.add('/ratings', ratingsController.ratingsView);

    router.start();
});
