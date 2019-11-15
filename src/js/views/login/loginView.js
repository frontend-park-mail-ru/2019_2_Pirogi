import View from '../../libs/view.js';
import template from './loginView.tmpl.xml';
import { clearError, renderError} from '../../libs/errorMessages';
import {errorMessages} from '../../libs/constants';

/**
 * Create a Login view
 * @class
 * @type {LoginView}
 */
export default class LoginView extends View {
    /**
   * @constructor
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
   */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root, template);
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
        this.root = root;

        this.submitsIds = {
            loginSubmit: 'js-login',
            registrationSubmit: 'js-register'
        };

        this.loginIds = {
            email: 'js-email-login',
            password: 'js-password-login'
        };

        this.registrationIds = {
            username: 'js-nickname-register',
            email: 'js-email-register'
        };

        this.registrationPasswordsIds = {
            password: 'js-password-register',
            passwordClone: 'js-password-register-clone'
        };

        // base events
        this.localEventBus.addEventListener('login',
            this.login.bind(this));
        this.localEventBus.addEventListener('loginFailed',
            this.loginFailed.bind(this));
        this.localEventBus.addEventListener('registration',
            this.registration.bind(this));
        this.localEventBus.addEventListener('registrationFailed',
            this.registrationFailed.bind(this));

        // error events
        this.localEventBus.addEventListener('clearError',
            clearError.bind(this));
        this.localEventBus.addEventListener('renderError',
            renderError.bind(this));
    }

    /**
     * Handle login event
     */
    login() {
        this.localEventBus.dispatchEvent('loginCheck');
    }

    /**
     * Handle login errors event
     */
    loginFailed(errors) {
        this.localEventBus.dispatchEvent('clearError', this.submitsIds.loginSubmit);
        if (Object.prototype.hasOwnProperty.call(errors,'error')) {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.loginSubmit, errors.error);
        } else {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.loginSubmit, errorMessages.unknown);
        }
    }

    /**
     * Handle registration event
     * @method
     */
    registration() {
        this.localEventBus.dispatchEvent('registrationCheck');
    }

    /**
     * Handle registration error event
     * @method
     */
    registrationFailed(errors) {
        this.localEventBus.dispatchEvent('clearError', this.submitsIds.registrationSubmit);
        if (Object.prototype.hasOwnProperty.call(errors,'error')) {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.registrationSubmit, errors.error);
        } else {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.registrationSubmit, errorMessages.unknown);
        }
    }

    /**
     * Set event listeners for fields
     * @method
     * @param target
     * @param eventCheck
     * @param eventCallBack
     */
    setEventListenersForFields(target, eventCheck, eventCallBack) {
        for (const property in target) {
            document.getElementById(target[property]).addEventListener('focusout', (field) => {
                if (this.localEventBus.dispatchEvent(eventCheck, field)) {
                    this.localEventBus.dispatchEvent(eventCallBack,
                        field.target.name, field.target.value);
                }
            });
        }
    }

    /**
     * Set event listeners fir depended fields
     * @method
     * @param target
     * @param eventCheck
     * @param eventCallBack
     * @param resultField
     */
    setEventListenersForDependentFields(target, eventCheck, eventCallBack, resultField) {
        for (const property in target) {
            document.getElementById(target[property]).addEventListener('focusout', (field) => {
                let fields = {};
                for (const property in target) {
                    if (Object.prototype.hasOwnProperty.call(target, property)) {
                        fields[property] = document.getElementById(target[property]);
                    }
                }
                if (this.localEventBus.dispatchEvent(eventCheck, fields)) {
                    this.localEventBus.dispatchEvent(eventCallBack,
                        resultField, field.target.value);
                }
            });
        }
    }

    /**
     * Rendering login page
     * @method
   * @param {object} data
   */
    render(data = {}) {
        if (this.globalEventBus.dispatchEvent('isAuth')) {
            this.localEventBus.dispatchEvent('authorizationSuccessful');
            return;
        }
        super.render(data);

        // login fields
        this.setEventListenersForFields(this.loginIds,
            'checkField', 'modifyLoginData');
        // login submit
        document.getElementById('js-login').addEventListener('click', () =>
            this.localEventBus.dispatchEvent('login'));

        // registration fields
        this.setEventListenersForFields(this.registrationIds,
            'checkField', 'modifyRegistrationData');
        // registration passwords
        this.setEventListenersForDependentFields(this.registrationPasswordsIds,
            'passwordsCheck', 'modifyRegistrationData', 'password');
        // registration submit
        document.getElementById(this.submitsIds.registrationSubmit).addEventListener('click', () =>
            this.localEventBus.dispatchEvent('registration'));
    }
}
