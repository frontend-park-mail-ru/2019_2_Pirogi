import View from '../../libs/view.js';

/** class*/
export default class NavbarView extends View {
    /**
     * @param {object} globalEventBus
     * @param {object} root
     */
    constructor(globalEventBus, root) {
        super(globalEventBus, root);

        this.globalEvetBus = globalEventBus;

        this.globalEvetBus.addEventListener('onNavbarSignInClicked',
            this.onSignInClicked.bind(this));
        this.globalEvetBus.addEventListener('onNavbarProfileClicked',
            this.onProfileClicked.bind(this));
    }

    onSignInClicked() {
        console.log('Go to login page');
    }

    onProfileClicked() {
        console.log('go to profile page');
    }

    /**
     * @param {object} data
     */
    render(data) {
        super.render(data);

        this.isAuth = true;
        if (this.isAuth === false) {
            this.signInButton = document.querySelector('<div class="button">');
            this.signInButton.addEventListener('click',
                this.globalEvetBus.dispatchEvent('onNavbarSingInClicked'));
        } else {
            this.profileButton = document.getElementsByClassName('profile-button')[0];
            this.profileButton.addEventListener('click',
                this.globalEvetBus.dispatchEvent('onNavbarProfileClicked'));
        }
    }
}
