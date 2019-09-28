import EventBus from '../libs/eventBus.js';
import LoginView from '../views/login/loginView.js';
import LoginModel from '../models/loginModel.js';

const loginEvents = [
    {key: 'myAuthEvent'},
    {key: 'authFailed'},
    {key: 'authGood'},
    {key: 'myRegisterEvent'},
    {key: 'onAuthCheck'},
    {key: 'onRegisterCheck'},
    {key: 'registerFailed'},
    {key: 'registerCompleted'},
];

/** class*/
export default class LoginController {
    /**
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(globalEventBus = {}, root = {}, router) {
        this.localEventBus = new EventBus(loginEvents);

        this.localEventBus.addEventListener('authGood',
            () => {router.route('/');});

        this.loginView = new LoginView(this.localEventBus, globalEventBus, root);
        this.loginModel = new LoginModel(this.localEventBus, globalEventBus);
    }
}
