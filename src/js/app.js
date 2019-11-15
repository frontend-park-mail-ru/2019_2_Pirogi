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
import ErrorView from './views/error/errorView';
import ActorController from './controllers/actorController';


document.addEventListener('DOMContentLoaded', () => {
    // Проверим, что эта технология доступна в браузере
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => {
                // регистрация сработала
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                // регистрация прошла неудачно
                console.log('Registration failed with ' + error);
            });
    }

    const globalEventBus = new EventBus([]);
    const header = document.querySelector('header');
    const body = document.querySelector('.js-append-tmpl');
    const bodyForRouter = document.querySelector('body');
    const router = new Router(bodyForRouter);

    const navbarController = new NavbarController(globalEventBus, header, router);
    const loginController = new LoginController(globalEventBus, body, router);
    const profileController = new ProfileController(globalEventBus, body, router);
    const filmController = new FilmController(globalEventBus, body, router);
    const searchResultsController = new SearchResultsController(globalEventBus, body);
    const indexController = new IndexController(globalEventBus, body);
    const adminController = new AdminController(globalEventBus, body);
    const actorController = new ActorController(globalEventBus,body);
    const errorView = new ErrorView(body);

    navbarController.navbarView.render();

    router.add('/login', loginController.loginView);
    router.add('/profile', profileController.profileView);
    router.add('/film', filmController.filmView);
    router.add('/search', searchResultsController.searchResultsView);
    router.add('/admin', adminController.adminView);
    router.add('/', indexController.indexView);
    router.add('/error', errorView);
    router.add('/actor', actorController.actorView);

    router.start();
});
