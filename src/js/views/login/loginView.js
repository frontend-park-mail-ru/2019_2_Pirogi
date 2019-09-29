import View from '../../libs/view.js';
import template from './loginView.tmpl.xml';

/** class*/
export default class LoginView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root, template);
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
        this.root = root;

        this.localEventBus.addEventListener('myAuthEvent',
            this.onAuth.bind(this));
        this.localEventBus.addEventListener('authFailed',
            this.onAuthReply.bind(this));
        this.localEventBus.addEventListener('myRegisterEvent',
            this.onRegister.bind(this));
        this.localEventBus.addEventListener('registerFailed',
            this.onRegisterReply.bind(this));
    }

    /** function */
    onAuthReply(data = {}) {
        console.log('Bad auth!');
        console.log(data);
    }

    /** function */
    onAuth() {
        this.loginEmailInput = document.querySelector('.js-email-login');
        this.loginPasswordInput = document.querySelector('.js-password-login');

        this.authData = {
            password: this.loginPasswordInput.value || null,
            login: this.loginEmailInput.value || null,
        };

        this.localEventBus.dispatchEvent('onAuthCheck', this.authData);
    }

    /** function */
    onRegister() {
        this.registerEmailInput = document.querySelector('.js-email-register');
        this.registerPasswordInput = document.querySelector('.js-password-register');
        this.registerNicknameInput = document.querySelector('.js-nickname-register');
        this.registerRepeatInput = document.querySelector('.js-repeat-register');

        this.registerData = {
            password: this.registerPasswordInput.value || null,
            login: this.registerEmailInput.value || null,
            nickname: this.registerNicknameInput.value || null,
            repeatPassword: this.registerRepeatInput.value || null,
        };

        this.localEventBus.dispatchEvent('onRegisterCheck', this.registerData);
    }

    /** function */
    onRegisterReply(data = {}) {
        console.log('Registration failed');
        console.log(data);
    }

    /**
   * @param {object} data
   */
    render(data = {}) {
        super.render(data);

        this.loginBitton = document.querySelector('.js-login');
        this.loginBitton.addEventListener('click',
            () => this.localEventBus.dispatchEvent('myAuthEvent'));

        this.registerButton = document.querySelector('.js-register');
        this.registerButton.addEventListener('click',
            () => this.localEventBus.dispatchEvent('myRegisterEvent'));
    }
}
