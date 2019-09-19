import EventBus from "../libs/eventBus.js"
import ProfileView from "../views/profile/profileView.js"
import ProfileModel from "../models/profileModel.js"


const profileEvents = [
    {key:"", func: undefined}
];

export default class ProfileController {
    constructor(globalEventBus = {}) {
        
        this.localEventBus = new EventBus(profileEvents);

        this.pView = new ProfileView(this.localEventBus, globalEventBus);
        this.pModel = new ProfileModel(this.localEventBus, globalEventBus);
    }
}