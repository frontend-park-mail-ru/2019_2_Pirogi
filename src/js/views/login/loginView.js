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
    }

    markupError(errorMsg) {
        return `<div class="error">${errorMsg}</div>`;
    }

    /** function */
    onAuthReply(errors) {
        if (Object.prototype.hasOwnProperty.call(errors,'email')) {
            document.querySelector('.js-email-login')
                .insertAdjacentHTML('afterend',
                    this.markupError('Email isn\'t valid.'));
        }
        if (Object.prototype.hasOwnProperty.call(errors,'password')) {
            document.querySelector('.js-password-login')
                .insertAdjacentHTML('afterend',
                    this.markupError('Password isn\'t valid.'));
        }
        if (Object.prototype.hasOwnProperty.call(errors,'error')) {
            document.querySelector('.js-email-login')
                .insertAdjacentHTML('afterend',
                    this.markupError(errors.error));
        }
    }

    /** function */
    onAuth() {
        this.loginEmailInput = document.querySelector('.js-email-login');
        this.loginPasswordInput = document.querySelector('.js-password-login');

        this.authData = {
            password: this.loginPasswordInput.value,
            email: this.loginEmailInput.value
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
            password: this.registerPasswordInput.value,
            email: this.registerEmailInput.value,
            name: this.registerNicknameInput.value,
            repeatPassword: this.registerRepeatInput.value
        };

        const errors = this.localEventBus.dispatchEvent('onRegisterCheck', this.registerData);
        if (errors !== undefined) {
            this.localEventBus.dispatchEvent('registerFailed', errors);
        }
    }

    /** function */
    onRegisterReply(errors) {
        if (Object.prototype.hasOwnProperty.call(errors,'name')) {
            document.querySelector('.js-nickname-register')
                .insertAdjacentHTML('afterend',
                    this.markupError('Name isn\'t valid.'));
        }
        if (Object.prototype.hasOwnProperty.call(errors,'email')) {
            document.querySelector('.js-email-register')
                .insertAdjacentHTML('afterend',
                    this.markupError('Email isn\'t valid.'));
        }
        if (Object.prototype.hasOwnProperty.call(errors,'password')) {
            document.querySelector('.js-password-register')
                .insertAdjacentHTML('afterend',
                    this.markupError('Password isn\'t valid.'));
        }
        if (Object.prototype.hasOwnProperty.call(errors,'passwordsMatch')) {
            document.querySelector('.js-repeat-register')
                .insertAdjacentHTML('afterend',
                    this.markupError('Passwords don\'t match.'));
        }
        if (Object.prototype.hasOwnProperty.call(errors,'error')) {
            document.querySelector('.js-email-register')
                .insertAdjacentHTML('afterend',
                    this.markupError(errors.error));
        }
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
            () => {
                this.localEventBus.dispatchEvent('clearErrors', 'register');
                this.localEventBus.dispatchEvent('myRegisterEvent');
            });
    }
}
