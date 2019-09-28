import View from '../../libs/view.js';
import template from './profile.tmpl.js';
import reviewsTmpl from './profile.reviews.tmpl.js';
import editTmpl from './profile.edit.tmpl.js';

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

        this.localEventBus.addEventListener('editButtonClicked',
            this.onEditButtonClicked.bind(this));
        this.localEventBus.addEventListener('saveButtonClicked',
            this.onEdit.bind(this));
        this.localEventBus.addEventListener('editGood',
            this.editGood.bind(this));
        this.localEventBus.addEventListener('editFailed',
            this.editFailed.bind(this));
    }

    renderWall(template, data = {}) {
        this.wall = document.querySelector('js-profile-wall');

        this.wall.innerHTML = template(data);
    }

    onEditButtonClicked() {
        this.editButton.disabled = true;

        this.renderWall(editTmpl);
        this.saveButton = document.querySelector('js-save-button');
        this.saveButton.addEventListener('click',
            this.localEventBus.dispatchEvent('saveButtonClicked'));
    }

    onEdit() {
        console.log('edit profile info');

        this.loginInput = document.querySelector('js-login-input');
        this.nicknameInput = document.querySelector('js-nickname-input');
        this.passwordInput = document.querySelector('js-password-input');
        this.descriptionInput = document.querySelector('js-description-textarea');
        this.avatarInput = document.querySelector('js-avatar-input');

        this.editData = {
            nickname: this.nicknameInput.value || null,
            login: this.loginInput.value || null,
            password: this.passwordInput.value || null,
            description: this.descriptionInput.value || null,
            avatar: this.avatarInput.value || null,
        };

        this.localEventBus.dispatchEvent('onEditingProfile', this.editData);
    }

    editGood() {
        console.log('edit good');
    }

    editFailed() {
        console.log('edit failed');
    }

    /**
   * @param {object} data
   */
    render(data = {}) {
        super.render(data);
        this.renderWall(reviewsTmpl);

        this.editButton = document.querySelector('js-edit-button');
        this.editButton.addEventListener('click',
            this.localEventBus.dispatchEvent('editButtonClicked'));
    }
}
