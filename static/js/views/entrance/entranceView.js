import View from "../../libs/view.js" 
//import template from "./login_tmpl.xml"


export default class EntranceView extends View {
    constructor(localEventBus, globalEventBus)
    {
        super(localEventBus);
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;


        this.localEventBus.addEventListener('myAuthEvent', this.OnAuth.bind(this));
        this.localEventBus.addEventListener('AuthFailed', this.OnAuthReply.bind(this));
        this.localEventBus.addEventListener('AuthGood', this.GoToMain.bind(this));
        this.localEventBus.addEventListener('myRegisterEvent', this.OnRegister().bind(this));
        this.localEventBus.addEventListener('RegisterFailed', this.OnRegisterReply.bind(this));
        this.localEventBus.addEventListener('RegisterCompleted', this.RegistrationOk.bind(this));
    }

    GoToMain() {
        //перенаправление пользователя на другую страницу
        console.log("Auth is good, lets go to main page!")
    }

    OnAuthReply() {
        //вывести сообщение об ошибке
        console.log("Bad auth!")
    }

    OnAuth() {
        // получить введенные данные
        console.log("lets read our data");
        
        //const password = document.getElementById('auth-password').value;
        //const login = document.getElementById('auth-login').value;
        const password = "blablabla";
        const login = "blabla@bla.ru";
        const isValid = true;

        if (isValid) {
            this.localEventBus.callEvent('OnAuthCheck', login, password);
        }
        else {
            console.log("Login validation failed");
        }
    }

    OnRegister() {
        console.log("lets see users data");

        //email = document.getElementById('register-email').value;
        //const nickname = document.getElementById('register-nickname').value;
        //const password = document.getElementById('register-password').value;
        //const repeatPassword = document.getElementById('register-reppassword').value;
        const password = "blablabla";
        const email = "blabla@bla.ru";
        const nickname = "vasyakrutoi";
        const repeatPassword = "blablabla";
        const isValid = true;

        if (isValid !== true) {
            console.log("Register form is not valid")
        } else {
            this.localEventBus.callEvent('OnRegisterCheck', email, nickname, password, repeatPassword);
        }
    }

    OnRegisterReply() {
        console.log("Registration failed");
    }

    RegistrationOk() {
        console.log("Registration OK");
    }

    render(root, data = {}) {
        //render page
        console.log("render login page");
        super.render(root, data);
        document.getElementById('login-button').addEventListener('click', this.localEventBus.callEvent('myAuthEvent').bind(this));
        document.getElementById('register-button').addEventListener('click', this.localEventBus.callEvent('myRegisterEvent').bind(this));
    }


}