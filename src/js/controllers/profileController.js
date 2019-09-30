import EventBus from '../libs/eventBus.js';
import ProfileView from '../views/profile/profileView.js';
import ProfileModel from '../models/profileModel.js';

/**
 * List of profile events
 * @type {Array|string}
 */
const profileEvents = [];

/**
 * Creates a new Profile controller
 * @class
 * @type {ProfileController}
 */
export default class ProfileController {
    /**
     * @constructor
     * @param {EventBus} globalEventBus
     * @param {Element} root
     */
    constructor(globalEventBus = {}, root = {}) {
        this.localEventBus = new EventBus(profileEvents);

        this.profileView = new ProfileView(this.localEventBus, globalEventBus, root);
        this.profileModel = new ProfileModel(this.localEventBus, globalEventBus);
    }
}
