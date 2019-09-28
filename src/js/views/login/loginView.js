import View from '../../libs/view.js';

/** class*/
export default class LoginView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root);
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

    clearErrors(form) {
        for (const item of Array.from(form.childNodes)) {
            if (item.className === 'error') {
                item.parentNode.removeChild(item);
            }
        }
    };

    /** function */
    onAuthReply(data = {}) {
        console.log('Bad auth!');
        console.log(data);
    }

    /** function */
    onAuth(form) {
        this.loginData = {
            email: form.getElementById('login__email').value,
            password: form.getElementById('login__password').value
        };
        this.localEventBus.dispatchEvent('onAuthCheck', this.loginData);
    }

    /** function */
    onRegister(form) {
        this.registerData = {
            name: form.getElementById('sign-in__name').value,
            email: form.getElementById('sign-in__email').value,
            password1: form.getElementById('sign-in__password1').value,
            password2: form.getElementById('sign-in__password2').value
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
    }
}
