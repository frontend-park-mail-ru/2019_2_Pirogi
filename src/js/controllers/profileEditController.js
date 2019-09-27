import EventBus from '../libs/eventBus.js';
import ProfileEditModel from '../models/profileEditModel';
import ProfileEditView from '../views/profileEdit/profileEditView';

const profileEvents = [];

/** class*/
export default class ProfileEditController {
    /**
     * @param {object} globalEventBus
     * @param {object} root
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(profileEvents);

        this.profileEditView = new ProfileEditView(this.localEventBus, globalEventBus, root);
        this.profileEditModel = new ProfileEditModel(this.localEventBus, globalEventBus);
    }
}
