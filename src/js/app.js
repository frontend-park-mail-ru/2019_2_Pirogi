import EventBus from './libs/eventBus.js';
import LoginController from './controllers/loginController.js';
import ProfileController from './controllers/profileController.js';
import FilmController from './controllers/filmController.js';
import SearchResultsController from './controllers/searchResultsController.js';
import IndexController from './controllers/indexController.js';
import AdminController from './controllers/adminController.js';
import NavbarController from './controllers/navbarController.js';

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

    // Проверка, чтобы lint не ругался
    if (navbarController !== undefined &&
      loginController !== undefined &&
      profileController !== undefined &&
      filmController !== undefined &&
      searchResultsController !== undefined &&
      indexController !== undefined &&
      adminController !== undefined &&
      body !== undefined
    ) {
        console.log('all controllers was build');
    }
});

