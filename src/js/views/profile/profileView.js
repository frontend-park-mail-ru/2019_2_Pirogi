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
        this.wall = document.getElementsByClassName('profile__wall')[0];

        this.wall.innerHTML = template(data);
    }

    onEditButtonClicked() {
        this.editButton.disabled = true;

        this.renderWall(editTmpl);
        this.saveButton = document.getElementById('profile-edit-button');
        this.saveButton.addEventListener('click',
            this.localEventBus.dispatchEvent('saveButtonClicked'));
    }

    onEdit() {
        console.log('edit profile info');

        this.loginInput = document.getElementsByName('login')[0];
        this.nicknameInput = document.getElementsByName('nickname')[0];
        this.passwordInput = document.getElementsByName('password')[0];
        this.descriptionInput = document.getElementsByName('description')[0];
        this.avatarInput = document.getElementsByName('avatar')[0];

        this.editData = {
            nickname: this.nicknameInput.value,
            login: this.loginInput.value,
            password: this.passwordInput.value,
            description: this.descriptionInput.value,
            avatar: this.avatarInput.value,
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

        this.editButton = document.querySelector('input [type=button]');
        this.editButton.addEventListener('click',
            this.localEventBus.dispatchEvent('editButtonClicked'));


    }
}
