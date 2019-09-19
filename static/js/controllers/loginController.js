import EventBus from "../libs/eventBus.js"
import LoginView from "../views/login/loginView.js"
import LoginModel from "../models/loginModel.js"

const loginEvents = [
    {key:"", func: undefined}
]

export default class LoginController {
    constructor(globalEventBus = {}) {
        this.localEventBus = new EventBus(loginEvents)

        this.lView = new LoginView(localEventBus, globalEventBus);
        this.lModel = new LoginModel(localEventBus, globalEventBus);
    }
}