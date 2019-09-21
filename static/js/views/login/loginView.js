import View from '../../libs/view.js' 
//import template from './login.tmpl.js'


export default class LoginView extends View {
    constructor(localEventBus, globalEventBus = {})
    {
        super(localEventBus);
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener('myAuthEvent', this.onAuth.bind(this));
        this.localEventBus.addEventListener('authFailed', this.onAuthReply.bind(this));
        this.localEventBus.addEventListener('authGood', this.goToMain.bind(this));
        this.localEventBus.addEventListener('myRegisterEvent', this.onRegister().bind(this));
        this.localEventBus.addEventListener('registerFailed', this.onRegisterReply.bind(this));
        this.localEventBus.addEventListener('registerCompleted', this.registrationOk.bind(this));
    }

    goToMain() {
        console.log('Auth is good, lets go to main page!')
    }

    onAuthReply() {
        console.log('Bad auth!')
    }

    onAuth() {
        console.log('lets read our data');
        
        this.authData = {
            password: 'blablabla',
            login: 'blabla@bla.ru',
        };

        this.localEventBus.dispatchEvent('onAuthCheck', this.authData);
    }

    onRegister() {
        console.log('lets see users data');

        this.registerData = {
            password: 'blablabla',
            email: 'blabla@bla.ru',
            nickname: 'vasyakrutoi',
            repeatPassword: 'blablabla',
        };

        this.localEventBus.dispatchEvent('onRegisterCheck', email, nickname, password, repeatPassword);
    }

    onRegisterReply() {
        console.log('Registration failed');
    }

    registrationOk() {
        console.log('Registration OK');
    }

    render(root, data = {}) {
        // Render page
        console.log('render login page');
        super.render(root, data);

        this.loginBitton = document.getElementById('login-button');
        this.loginBitton.addEventListener('click', this.localEventBus.dispatchEvent('myAuthEvent').bind(this));
        this.registerButton = document.getElementById('register-button');
        this.registerButton.addEventListener('click', this.localEventBus.dispatchEvent('myRegisterEvent').bind(this));
    }


}