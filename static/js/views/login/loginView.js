import View from "../../libs/view.js" 
import template from "./login_tmpl.xml"


export default class LoginView extends View {
    controller(localEventBus, globalEventBus)
    {
        super(localEventBus, template)
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;


        this.localEventBus.addEventListener('myAuthEvent', this.OnAuth().bind(this))
        this.localEventBus.addEventListener('AuthFailed', this.OnAuthReply().bind(this))
        this.localEventBus.addEventListener('AuthGood', this.GoToMain().bind(this))
    }

    /* 1. Нажата кнопка Логин
    - вызвать валидацию формы
    2. получен ответ от модели о правильности формы
    - залогинить
    - ошибка
    */
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
        console.log("lets read our data")
        
        let password = "fdfsf"
        let login = "blabla"

        this.localEventBus.callEvent('OnAuthCheck', login, password)
    }

   /* OnRegister() {
        console.log("lets see users data")

        let email = document.getElementById('register-emeil').nodeValue;
        let nickname;
    }*/

    render(root, data = {}) {
        //render page
        console.log("render login page")
        super.render(root, data)
        document.getElementById('login-button').addEventListener('click', this.localEventBus.callEvent('myAuthEvent').bind(this));
        document.getElementById('register-button').addEventListener('click', this.localEventBus.callEvent('myRegisterEvent').bind(this));
    }


}