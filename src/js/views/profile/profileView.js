import View from '../../libs/view.js';
import template from './profile.tmpl.xml';
import reviewsTmpl from './profile.reviews.tmpl.xml';
import editTmpl from './profile.edit.tmpl.xml';
import listTmpl from './profile.list.tmpl.xml';
import eventsTmpl from './profile.events.tmpl.xml';
import {clearError, renderError} from '../../libs/errorMessages';
import {errorMessages} from '../../libs/constants';
import EventBus from '../../libs/eventBus';

/**
 * Creates a new Profile view
 * @class
 * @type {ProfileView}
 * @listens 'editButtonClicked'
 * @listens 'saveButtonClicked'
 * @listens 'editOk'
 * @listens 'backButtonClicked'
 * @listens 'avatarButtonClicked'
 */
export default class ProfileView extends View {
    /**
     * @constructor
     * @param {Object} localEventBus
     * @param {Object} globalEventBus
     * @param {Object} root
     */
    constructor(localEventBus = EventBus, globalEventBus = EventBus, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

        this.data = {};
        this.eventsData = {
            eventsArray: [],
            subscribersArray: [],
        };
        this.localTmpl = reviewsTmpl;

        this.submitsIds = {
            loginSubmit: 'js-save-login-button',
            passwordSubmit: 'js-save-password-button',
            infoSubmit: 'js-save-button',
            avatarSubmit: 'js-avatar-button'
        };

        this.infoIds = {
            username: 'js-username-input',
            description: 'js-description-textarea',
        };

        this.loginIds = {
            email: 'js-email-input',
        };

        this.oldPasswordIds = {
            oldPassword: 'js-oldpassword-input',
        };

        this.passwordsIds = {
            password: 'js-password-input',
            passwordClone: 'js-password-rep-input',
        };

        this.localEventBus.addEventListener('avatarButtonClicked',
            this.onEditAvatar.bind(this));

        this.localEventBus.addEventListener('editOk',
            this.editOk.bind(this));
        this.localEventBus.addEventListener('editFailed',
            this.editFailed.bind(this));
        this.localEventBus.addEventListener('avatarEditFailed',
            this.editAvatarFailed.bind(this));

        this.localEventBus.addEventListener('getInfoOk',
            this.getInfoOk.bind(this));

        this.localEventBus.addEventListener('eventsGood',
            this.eventsGood.bind(this));

        // error events
        this.localEventBus.addEventListener('clearError',
            clearError.bind(this));
        this.localEventBus.addEventListener('renderError',
            renderError.bind(this));
    }

    getInfoOk(data) {
        this.userData = data;

        super.render(data);
        this.editButton = document.querySelector('.js-edit-button');

        if (this.data.edit === 'edit') {
            this.onEditButtonClicked();
        } else if (this.data.lists === 'lists') {
            this.onListButtonClicked();
        } else if (this.data.events === 'events') {
            this.onEventsButtonClicked();
        } else {
            this.onReviewButtonClicked();
        }
    }

    /**
     * Render the profile wall
     * @method
     * @param {Object} data
     */
    renderWall(data = {}) {
        const wall = document.querySelector('.js-profile-wall');
        wall.innerHTML = this.localTmpl(data);
    }

    ///////buttonsclicked
    /**
     * On event
     * @method
     */
    onEditButtonClicked() {
        this.editButton.disabled = true;

        this.localTmpl = editTmpl;
        this.renderWall();
        this.addEventListenersForEdit();
        this.addListenersForBar();
    }

    /**
     * @method
     */
    onListButtonClicked() {
        this.localTmpl = listTmpl;
        this.renderWall();

        this.addListenersForBar();
    }

    /**
     * On event
     * @method
     */
    onReviewButtonClicked() {
        this.localTmpl = reviewsTmpl;
        this.renderWall();
        this.editButton.disabled = false;
        this.addListenersForBar();
    }

    onEventsButtonClicked() {
        this.localTmpl = eventsTmpl;
        this.renderWall();

        this.localEventBus.dispatchEvent('getEvents');

        this.addListenersForBar();
    }

    eventsGood(data = {}) {
        if (this.localTmpl === eventsTmpl) {
            this.eventsData.eventsArray = data.new_events;
            this.renderWall(this.eventsData);
            this.addListenersForBar();
        }
    }

    subscribersGood(data = {}) {
        if (this.localTmpl === eventsTmpl) {
            this.eventsData.subscribersArray = data.subscriptions;
            this.renderWall(this.eventsData);
            this.addListenersForBar();
        }
    }

    addListenersForBar() {
        this.editButton.addEventListener('click', () => {
            this.onEditButtonClicked();
        });

        const reviewsButton = document.querySelector('.js-reviews-button');
        if (reviewsButton) {
            reviewsButton.addEventListener('click', () => {
                this.onReviewButtonClicked();
            });
        }
        const listButton = document.querySelector('.js-list-button');
        if (listButton) {
            listButton.addEventListener('click', () => {
                this.onListButtonClicked();
            });
        }
        const eventsButton = document.querySelector('.js-events-button');
        if (eventsButton) {
            eventsButton.addEventListener('click', () => {
                this.onEventsButtonClicked();
            });
        }
    }

    /////event listeners
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
                    if (target[property]) {
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

    /////////Edit part
    /**
     * On event
     * @method
     */
    editOk() {
        this.data.reviews = 'reviews';
        this.localEventBus.dispatchEvent('getProfileInfo');
    }

    editFailed(errors) {
        this.localEventBus.dispatchEvent('clearError', this.submitsIds.infoSubmit);
        if (errors.error) {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.infoSubmit, errors.error);
        } else {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.infoSubmit, errorMessages.unknown);
        }
    }

    editAvatarFailed(errors) {
        this.localEventBus.dispatchEvent('clearError', this.submitsIds.avatarSubmit);
        if (errors.error) {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.avatarSubmit, errors.error);
        } else {
            this.localEventBus.dispatchEvent('renderError',
                this.submitsIds.avatarSubmit, errorMessages.unknown);
        }
    }

    /**
     * On event
     * @method
     */
    onEditAvatar() {
        const avatarInput = document.querySelector('.js-avatar-input');

        const editAvatarData = {
            avatar: avatarInput.files[0] || null,
        };

        this.localEventBus.dispatchEvent('onEditingAvatar', editAvatarData);
    }


    addEventListenersForEdit() {
        this.setEventListenersForFields(this.infoIds,
            'checkField', 'modifyInfoData');
        //this.setEventListenersForFields(this.loginIds,
        //    'checkField', 'modifyLoginData');
        //this.setEventListenersForFields(this.oldPasswordIds,
        //    'checkField', 'modifyPasswordData');
        //this.setEventListenersForDependentFields(this.passwordsIds,
        //    'passwordsCheck', 'modifyPasswordData', 'password');

        const saveButton = document.getElementById('js-save-button');
        saveButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('onEditingProfile');
        });
        /*
        const saveLoginButton = document.getElementById('js-save-login-button');
        saveLoginButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('onEditingProfile');
        });
        const savePasswordButton = document.getElementById('js-save-password-button');
        savePasswordButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('onEditingPassword');
        });*/

        const avatarButton = document.querySelector('.js-avatar-button');
        avatarButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('avatarButtonClicked');
        });
    }

    /**
     * Render the Profile
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        this.data = data;

        this.localEventBus.dispatchEvent('getProfileInfo');
    }
}
