import View from '../../libs/view.js';
import template from './profile.tmpl.xml';
import reviewsTmpl from './profile.reviews.tmpl.xml';
import editTmpl from './profile.edit.tmpl.xml';
import listTmpl from './profile.list.tmpl.xml';
import {clearError, renderError} from '../../libs/errorMessages';
import {errorMessages} from '../../libs/constants';

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
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root, template);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

        this.localTmpl = reviewsTmpl;

        this.submitsIds = {
            loginSubmit: 'js-save-login-button',
            passwordSubmit: 'js-save-password-button',
            infoSubmit: 'js-save-button',
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

        this.localEventBus.addEventListener('editButtonClicked',
            this.onEditButtonClicked.bind(this));
        this.localEventBus.addEventListener('listButtonClicked',
            this.onListButtonClicked.bind(this));
        this.localEventBus.addEventListener('backButtonClicked',
            this.onBackButtonClicked.bind(this));

        this.localEventBus.addEventListener('avatarButtonClicked',
            this.onEditAvatar.bind(this));

        this.localEventBus.addEventListener('editOk',
            this.editOk.bind(this));
        this.localEventBus.addEventListener('editFailed',
            this.editFailed.bind(this));

        this.localEventBus.addEventListener('getInfoOk',
            this.getInfoOk.bind(this));

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

        if (this.localTmpl === editTmpl) {
            this.onEditButtonClicked();
        } else if (this.localTmpl === reviewsTmpl) {
            this.onBackButtonClicked();
        } else {
            this.onListButtonClicked();
        }
    }

    /**
     * Render the profile wall
     * @method
     * @param {function} template
     * @param {Object} data
     */
    renderWall(template, data = {}) {
        this.wall = document.querySelector('.js-profile-wall');
        this.wall.innerHTML = template(data);
    }

    ///////buttonsclicked
    /**
     * On event
     * @method
     */
    onEditButtonClicked() {
        this.editButton.disabled = true;

        this.renderWall(editTmpl);
        this.addEventListenersForEdit();
    }

    /**
     * @method
     */
    onListButtonClicked() {
        this.renderWall(listTmpl);
        this.editButton = document.querySelector('.js-edit-button');
        this.editButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('editButtonClicked');
        });
        const reviewsButton = document.querySelector('.js-reviews-button');
        reviewsButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('backButtonClicked');
        });
    }

    /**
     * On event
     * @method
     */
    onBackButtonClicked() {

        this.renderWall(reviewsTmpl);

        this.editButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('editButtonClicked');
        });

        this.editButton.disabled = false;
        const listButton = document.querySelector('.js-list-button');
        listButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('listButtonClicked');
        });
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
        this.localTmpl = reviewsTmpl;
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
        this.setEventListenersForFields(this.loginIds,
            'checkField', 'modifyLoginData');
        this.setEventListenersForFields(this.oldPasswordIds,
            'checkField', 'modifyPasswordData');
        this.setEventListenersForDependentFields(this.passwordsIds,
            'passwordsCheck', 'modifyPasswordData', 'password');

        const saveButton = document.getElementById('js-save-button');
        saveButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('onEditingProfile');
        });

        const saveLoginButton = document.getElementById('js-save-login-button');
        saveLoginButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('onEditingProfile');
        });
        const savePasswordButton = document.getElementById('js-save-password-button');
        savePasswordButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('onEditingPassword');
        });

        const avatarButton = document.querySelector('.js-avatar-button');
        avatarButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('avatarButtonClicked');
        });

        const backButton = document.querySelector('.js-back-button');
        backButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('backButtonClicked');
        });
    }

    /**
     * Render the Profile
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        if (data.reviews === 'reviews') {
            this.localTmpl = reviewsTmpl;
        } else if (data.lists === 'lists') {
            this.localTmpl = listTmpl;
        } else if (data.edit === 'edit') {
            this.localTmpl = editTmpl;
        } else {
            this.localTmpl = reviewsTmpl;
        }
        this.localEventBus.dispatchEvent('getProfileInfo');
    }
}
