import View from '../../libs/view.js';
import template from './login.tmpl.js';

/** class*/
export default class LoginView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus, globalEventBus = {}, root) {
        super(localEventBus, template, root);
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
        this.root = root;

        this.localEventBus.addEventListener('myAuthEvent',
            this.onAuth.bind(this));
        this.localEventBus.addEventListener('authFailed',
            this.onAuthReply.bind(this));
        this.localEventBus.addEventListener('authGood',
            this.goToMain.bind(this));
        this.localEventBus.addEventListener('myRegisterEvent',
            this.onRegister.bind(this));
        this.localEventBus.addEventListener('registerFailed',
            this.onRegisterReply.bind(this));
        this.localEventBus.addEventListener('registerCompleted',
            this.registrationOk.bind(this));
    }

    /** function */
    goToMain() {
        console.log('Auth is good, lets go to main page!');
    }

    /** function */
    onAuthReply() {
        console.log('Bad auth!');
    }

    /** function */
    onAuth() {
        console.log('lets read our data');

        this.authData = {
            password: 'blablabla',
            login: 'blabla@bla.ru',
        };

        this.localEventBus.dispatchEvent('onAuthCheck', this.authData);
    }

    /** function */
    onRegister() {
        console.log('lets see users data');

        this.registerData = {
            password: 'blablabla',
            email: 'blabla@bla.ru',
            nickname: 'vasyakrutoi',
            repeatPassword: 'blablabla',
        };

        this.localEventBus.dispatchEvent('onRegisterCheck', this.registerData);
    }

    /** function */
    onRegisterReply() {
        console.log('Registration failed');
    }

    /** function */
    registrationOk() {
        console.log('Registration OK');
    }
    /**
   * @param {object} data
   */
    render(data = {}) {
    // Render page
        console.log('render login page');
        super.render(data);

        this.loginBitton = document.getElementById('login-button');
        this.loginBitton.addEventListener('click',
            this.localEventBus.dispatchEvent('myAuthEvent').bind(this));
        this.registerButton = document.getElementById('register-button');
        this.registerButton.addEventListener('click',
            this.localEventBus.dispatchEvent('myRegisterEvent').bind(this));
    }
}
