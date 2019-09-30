import View from '../../libs/view.js';
import template from './profile.tmpl.xml';
import reviewsTmpl from './profile.reviews.tmpl.xml';
import editTmpl from './profile.edit.tmpl.xml';

/** class*/
export default class ProfileView extends View {
    /**
   * @param {object} localEventBus
   * @param {object} globalEventBus
   * @param {object} root
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
        this.localEventBus.addEventListener('clearErrors',
            this.clearErrors.bind(this));

        this.localEventBus.addEventListener('getInfoOk',
            this.getInfoOk.bind(this));
        this.localEventBus.addEventListener('getInfoFailed',
            this.getInfoFailed.bind(this));
    }

    getInfoOk(data) {
        console.log(data);

        super.render(data);
        this.renderWall(reviewsTmpl);

        this.editButton = document.querySelector('.js-edit-button');
        this.editButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('editButtonClicked');
        });
    }

    getInfoFailed(data) {
        console.log('failed to load');
    }

    clearErrors() {
        for (const item of Array.from(document.querySelector(`.profile-edit-form`).childNodes)) {
            if (item.className === 'error') {
                item.parentNode.removeChild(item);
            }
        }
    };

    markupError(errorMsg) {
        return `<div class="error">${errorMsg}</div>`;
    };

    renderWall(template, data = {}) {
        this.wall = document.querySelector('.js-profile-wall');

        this.wall.innerHTML = template(data);
    }

    onEditButtonClicked() {
        this.editButton.disabled = true;

        this.renderWall(editTmpl);
        this.saveButton = document.querySelector('.js-save-button');
        this.saveButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('clearErrors');
            this.localEventBus.dispatchEvent('saveButtonClicked');
        });

        this.avatarButton = document.querySelector('.js-avatar-button');
        this.avatarButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('avatarButtonClicked');});

        this.backButton = document.querySelector('.js-back-button');
        this.backButton.addEventListener('click', () => {
            this.localEventBus.dispatchEvent('backButtonClicked');});
    }

    onBackButtonClicked() {
        this.editButton.disabled = false;

        this.renderWall(reviewsTmpl);
    }

    onEditAvatar() {
        this.avatarInput = document.querySelector('.js-avatar-input');

        this.editAvatarData = {
            avatar: this.avatarInput.value || null,
        };

        this.localEventBus.dispatchEvent('onEditingAvatar', this.editAvatarData);
    }

    onEdit() {
        console.log('edit profile info');

        this.loginInput = document.querySelector('.js-login-input');
        this.nicknameInput = document.querySelector('.js-nickname-input');
        this.passwordInput = document.querySelector('.js-password-input');
        this.descriptionInput = document.querySelector('.js-description-textarea');

        this.editData = {
            name: this.nicknameInput.value,
            email: this.loginInput.value,
            password: this.passwordInput.value,
            description: this.descriptionInput.value,
        };

        this.localEventBus.dispatchEvent('onEditingProfile', this.editData);
    }

    editOk() {
        this.localEventBus.dispatchEvent('getProfileInfo');
    }

    editFailed(errors) {
        if (errors.hasOwnProperty('name')) {
            document.querySelector('.js-nickname-input')
                .insertAdjacentHTML('afterend',
                    this.markupError('Name isn\'t valid.'));
        }
        if (errors.hasOwnProperty('email')) {
            document.querySelector('.js-login-input')
                .insertAdjacentHTML('afterend',
                    this.markupError('Email isn\'t valid.'));
        }
        if (errors.hasOwnProperty('password')) {
            document.querySelector('.js-password-input')
                .insertAdjacentHTML('afterend',
                    this.markupError('Password isn\'t valid.'));
        }
        if (errors.hasOwnProperty('error')) {
            document.querySelector('.js-email-register')
                .insertAdjacentHTML('afterend',
                    this.markupError(errors.error));
        }
    }

    /**
   * @param {object} data
   */
    render(data = {}) {
        this.localEventBus.dispatchEvent('getProfileInfo');
    }
}
