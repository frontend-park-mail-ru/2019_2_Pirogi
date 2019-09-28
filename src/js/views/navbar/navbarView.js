import View from '../../libs/view.js';
import template from './navbarView.tmpl.xml';

/** class*/
export default class NavbarView extends View {
    /**
     * @param {object} globalEventBus
     * @param {object} root
     */
    constructor(globalEventBus = {}, root = {}) {
        super(globalEventBus, root, template);

        this.globalEvetBus = globalEventBus;

        this.globalEvetBus.addEventListener('onNavbarSignInClicked',
            this.onSignInClicked.bind(this));
        this.globalEvetBus.addEventListener('onNavbarProfileClicked',
            this.onProfileClicked.bind(this));
        this.globalEvetBus.addEventListener('authPassed',
            this.authPassed.bind(this));
    }

    authPassed() {
        console.log('auth passed! lets change our navbar!');
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
        const dataAuth = data || this.globalEvetBus.dispatchEvent('checkAuth');
        super.render(dataAuth);

        // this.isAuth = true;
        // if (this.isAuth === false) {
        //     this.signInButton = document.querySelector('<div class="button">');
        //     this.signInButton.addEventListener('click',
        //         this.globalEvetBus.dispatchEvent('onNavbarSingInClicked'));
        // } else {
        //     this.profileButton = document.getElementsByClassName('profile-button')[0];
        //     this.profileButton.addEventListener('click',
        //         this.globalEvetBus.dispatchEvent('onNavbarProfileClicked'));
        // }
    }
}
