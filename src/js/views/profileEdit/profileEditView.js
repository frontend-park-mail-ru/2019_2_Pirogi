import View from '../../libs/view.js';

/** class*/
export default class ProfileEditView extends View {
    /**
     * @param {object} localEventBus
     * @param {object} globalEventBus
     * @param {object} root
     */
    constructor(localEventBus = {}, globalEventBus = {}, root = {}) {
        super(localEventBus, root);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

        this.localEventBus.addEventListener('buttonClicked', this.onEdit.bind(this));
        this.localEventBus.addEventListener('editGood', this.editGood.bind(this));
        this.localEventBus.addEventListener('editFailed', this.editFailed.bind(this));
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

        this.button = document.getElementById('profile-edit__button');
        this.button.addEventListener('click', this.localEventBus.dispatchEvent('buttonClicked'));
    }
}
