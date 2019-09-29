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
        this.localEventBus.addEventListener('clearErrors',
            this.clearErrors.bind(this));
    }

    clearErrors(target) {
        for (const item of Array.from(document.querySelector(`.login__${target}`).childNodes)) {
            if (item.className === 'error') {
                item.parentNode.removeChild(item);
            }
        }
    };

    markupError(errorMsg) {
        return `<div class="error">${errorMsg}</div>`;
    };

    /** function */
    onAuthReply(errors) {
        if (errors.hasOwnProperty('email')) {
            document.querySelector('.js-email-login')
                .insertAdjacentHTML('afterend',
                    this.markupError('Email isn\'t valid.'));
        }
        if (errors.hasOwnProperty('password')) {
            document.querySelector('.js-password-login')
                .insertAdjacentHTML('afterend',
                    this.markupError('Password isn\'t valid.'));
        }
    }

    /** function */
    onAuth() {
        this.loginEmailInput = document.querySelector('.js-email-login');
        this.loginPasswordInput = document.querySelector('.js-password-login');

        this.authData = {
            password: this.loginPasswordInput.value || null,
            email: this.loginEmailInput.value || null,
        };

        const errors = this.localEventBus.dispatchEvent('onAuthCheck', this.authData);
        if (errors !== undefined) {
            this.localEventBus.dispatchEvent('authFailed', errors).bind(this);
        }
    }

    /** function */
    onRegister() {
        this.registerEmailInput = document.querySelector('.js-email-register');
        this.registerPasswordInput = document.querySelector('.js-password-register');
        this.registerNicknameInput = document.querySelector('.js-nickname-register');
        this.registerRepeatInput = document.querySelector('.js-repeat-register');

        this.registerData = {
            password: this.registerPasswordInput.value || null,
            email: this.registerEmailInput.value || null,
            name: this.registerNicknameInput.value || null,
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

        this.loginButton = document.querySelector('.js-login');
        this.loginButton.addEventListener('click',
            () => {
                this.localEventBus.dispatchEvent('clearErrors', 'auth');
                this.localEventBus.dispatchEvent('myAuthEvent');
            });

        this.registerButton = document.querySelector('.js-register');
        this.registerButton.addEventListener('click',
            () => this.localEventBus.dispatchEvent('myRegisterEvent'));
    }
}
