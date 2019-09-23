import EventBus from '../libs/eventBus.js';
import ProfileView from '../views/profile/profileView.js';
import ProfileModel from '../models/profileModel.js';

const profileEvents = [
    {},
];

/** class*/
export default class ProfileController {
    /**
   * @param {object} globalEventBus
   */
    constructor(globalEventBus = {}) {
        this.localEventBus = new EventBus(profileEvents);

        this.profileView = new ProfileView(this.localEventBus, globalEventBus);
        this.profileModel = new ProfileModel(this.localEventBus, globalEventBus);
    }
}
