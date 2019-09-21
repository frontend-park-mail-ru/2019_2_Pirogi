import EventBus from '../libs/eventBus.js'
import LoginView from '../views/login/loginView.js'
import LoginModel from '../models/loginModel.js'

const loginEvents = [
    {key:'myAuthEvent'},
    {key:'AuthFailed'},
    {key:'AuthGood'},
    {key:'myRegisterEvent'},
    {key:'onAuthCheck'},
    {key:'onRegisterCheck'},
    {key:'RegisterFailed'},
    {key:'RegisterCompleted'},
];

export default class LoginController {
    constructor(globalEventBus = {}) {
        this.localEventBus = new EventBus(loginEvents);

        this.loginView = new LoginView(this.localEventBus, globalEventBus);
        this.loginModel = new LoginModel(this.localEventBus, globalEventBus);
    }
}