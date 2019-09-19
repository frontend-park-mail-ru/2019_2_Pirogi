import EventBus from "./libs/eventBus.js"
import LoginController from "./controllers/loginController"

const sayHello = () => {
    console.log("hello");
}

(function Application() {
    const globalEventBus = new EventBus([{key:"NewsButtonClicked", func: sayHello}]);

    const lController = new LoginController(globalEventBus);
})()