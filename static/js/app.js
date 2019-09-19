import EventBus from "./libs/eventBus.js"
import EntranceController from "./controllers/entranceController"
import ProfileController from "./controllers/profileController"
import FilmController from "./controllers/filmController";

const sayHello = () => {
    console.log("hello");
};

(function Application() {
    const globalEventBus = new EventBus([{key:"NewsButtonClicked", func: sayHello}]);

    const eController = new EntranceController(globalEventBus);
    const pController = new ProfileController(globalEventBus);
    const fController = new FilmController(globalEventBus);
})();