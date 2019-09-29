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
<<<<<<< HEAD
        this.localEventBus.addEventListener('clearErrors',
            this.clearErrors.bind(this));
    }

    clearErrors(form) {
        for (const item of Array.from(form.childNodes)) {
            if (item.className === 'error') {
                item.parentNode.removeChild(item);
            }
        }
    };

    markupError(errorMsg) {
        return `<div class="error">${errorMsg}</div>`;
    };

    /** function */
    onAuthReply(form, errors) {
        if (errors.hasOwnProperty('email')) {
            form.getElementById('login__email')
                .insertAdjacentHTML('afterend',
                    markupError('Email isn\'t valid.'));
        }
        if (errors.hasOwnProperty('password')) {
            form.getElementById('login__password')
                .insertAdjacentHTML('afterend',
                    markupError('Password isn\'t valid.'));
        }
    }

    /** function */
    onAuth(form) {
        this.loginData = {
            email: form.getElementById('login__email').value,
            password: form.getElementById('login__password').value
        };
        const errors = this.localEventBus.dispatchEvent('onAuthCheck', this.loginData);
        if (errors !== undefined) {
            this.localEventBus.dispatchEvent('authFailed', form, errors).bind(this);
        }
    }

    /** function */
    onRegister(form) {
        this.registerData = {
            name: form.getElementById('sign-in__name').value,
            email: form.getElementById('sign-in__email').value,
            password1: form.getElementById('sign-in__password1').value,
            password2: form.getElementById('sign-in__password2').value
        };
        const errors = this.localEventBus.dispatchEvent('onRegisterCheck', this.registerData);
        if (errors !== undefined) {
            this.localEventBus.dispatchEvent('registerFailed', form, errors).bind(this);
        }
    }

    /** function */
    onRegisterReply(form, errors) {
        if (errors.hasOwnProperty('name')) {
            form.getElementById('sign-in__name')
                .insertAdjacentHTML('afterend',
                    markupError('Name isn\'t valid.'));
        }
        if (errors.hasOwnProperty('email')) {
            form.getElementById('sign-in__email')
                .insertAdjacentHTML('afterend',
                    markupError('Email isn\'t valid.'));
        }
        if (errors.hasOwnProperty('password')) {
            form.getElementById('sign-in__password')
                .insertAdjacentHTML('afterend',
                    markupError('Password isn\'t valid.'));
        }
        if (errors.hasOwnProperty('password')) {
            form.getElementById('sign-in__password')
                .insertAdjacentHTML('afterend',
                    markupError('Password isn\'t valid.'));
        }
=======
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
            email: this.loginEmailInput.value || null,
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
>>>>>>> dev
    }

    /**
   * @param {object} data
   */
    render(data = {}) {
<<<<<<< HEAD
    // Render page
        console.log('render login page');
        super.render(data);

        document.getElementById('login').addEventListener('submit',
            event => {
                event.preventDefault();
                this.localEventBus.dispatchEvent('clearErrors', event.target).bind(this);
                this.localEventBus.dispatchEvent('myAuthEvent', event.target).bind(this);
            });

        document.getElementById('sign-in').addEventListener('submit',
            event => {
                event.preventDefault();
                this.localEventBus.dispatchEvent('clearErrors', event.target).bind(this);
                this.localEventBus.dispatchEvent('myRegisterEvent', event.target).bind(this);
            });
=======
        super.render(data);

        this.loginBitton = document.querySelector('.js-login');
        this.loginBitton.addEventListener('click',
            () => this.localEventBus.dispatchEvent('myAuthEvent'));

        this.registerButton = document.querySelector('.js-register');
        this.registerButton.addEventListener('click',
            () => this.localEventBus.dispatchEvent('myRegisterEvent'));
>>>>>>> dev
    }
}
