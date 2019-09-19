import EventBus from "./libs/eventBus.js"
import EntranceController from "./controllers/entranceController"
import ProfileController from "./controllers/profileController"
import FilmController from "./controllers/filmController";
import SearchController from "./controllers/searchController";
import IndexController from "./controllers/indexController";
import AdminController from "./controllers/adminController";

const sayHello = () => {
    console.log("hello");
};

(function Application() {
    const globalEventBus = new EventBus([{key:"NewsButtonClicked", func: sayHello}]);

    const eController = new EntranceController(globalEventBus);
    const pController = new ProfileController(globalEventBus);
    const fController = new FilmController(globalEventBus);
    const sController = new SearchController(globalEventBus);
    const iController = new IndexController(globalEventBus);
    const aController = new AdminController(globalEventBus);

})();