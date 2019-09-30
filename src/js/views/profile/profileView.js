import View from '../../libs/view.js';
import template from './profile.tmpl.xml';
import reviewsTmpl from './profile.reviews.tmpl.xml';
import editTmpl from './profile.edit.tmpl.xml';


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

        this.userData = {};

        this.localEventBus.addEventListener('editButtonClicked',
            this.onEditButtonClicked.bind(this));
        this.localEventBus.addEventListener('saveButtonClicked',
            this.onEdit.bind(this));
        this.localEventBus.addEventListener('editOk',
            this.editOk.bind(this));
        this.localEventBus.addEventListener('editFailed',
            this.editFailed.bind(this));
        this.localEventBus.addEventListener('backButtonClicked',
            this.onBackButtonClicked.bind(this));
        this.localEventBus.addEventListener('avatarButtonClicked',
            this.onEditAvatar.bind(this));
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

    /**
     * On event
     * @method
     */
    onEditButtonClicked() {
        this.editButton.disabled = true;

        this.renderWall(editTmpl);
        this.saveButton = document.querySelector('.js-save-button');
        this.saveButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('saveButtonClicked');
        });

        this.avatarButton = document.querySelector('.js-avatar-button');
        this.avatarButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('avatarButtonClicked');
        });

        this.backButton = document.querySelector('.js-back-button');
        this.backButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('backButtonClicked');
        });
    }

    /**
     * On event
     * @method
     */
    onBackButtonClicked() {
        this.editButton.disabled = false;

        this.renderWall(reviewsTmpl);
    }

    /**
     * On event
     * @method
     */
    onEditAvatar() {
        this.avatarInput = document.querySelector('.js-avatar-input');

        this.editAvatarData = {
            avatar: this.avatarInput.value || null,
        };

        this.localEventBus.dispatchEvent('onEditingAvatar', this.editAvatarData);
    }

    /**
     * On event
     * @method
     */
    onEdit() {
        console.log('edit profile info');

        this.loginInput = document.querySelector('.js-login-input');
        this.nicknameInput = document.querySelector('.js-nickname-input');
        this.passwordInput = document.querySelector('.js-password-input');
        this.descriptionInput = document.querySelector('.js-description-textarea');

        this.editData = {
            name: this.nicknameInput.value || null,
            email: this.loginInput.value || null,
            password: this.passwordInput.value || null,
            description: this.descriptionInput.value || null,
        };

        this.localEventBus.dispatchEvent('onEditingProfile', this.editData);
    }

    /**
     * On event
     * @method
     */
    editOk() {
        console.log('edit ok');
    }

    /**
     * On edit
     * @method
     */
    editFailed() {
        console.log('edit failed');
    }

    /**
     * Render the Profile
     * @method
     * @param {Object} data
     */
    render(data = {}) {
        this.localEventBus.dispatchEvent('getProfileInfo');

        super.render(data);
        this.renderWall(reviewsTmpl);

        this.editButton = document.querySelector('.js-edit-button');
        this.editButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('editButtonClicked');
        });
    }
}
