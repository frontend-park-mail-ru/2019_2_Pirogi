import EventBus from "../libs/eventBus.js"
import EntranceView from "../views/entrance/entranceView.js"
import EntranceModel from "../models/entranceModel.js"

const loginEvents = [
    {key:"myAuthEvent", func: undefined},
    {key:"AuthFailed", func: undefined},
    {key:"AuthGood", func: undefined},
    {key:"myRegisterEvent", func: undefined},
    {key:"onAuthCheck", func: undefined},
    {key:"onRegisterCheck", func: undefined},
    {key:"RegisterFailed", func: undefined},
    {key:"RegisterCompleted", func: undefined},
];

export default class EntranceController {
    constructor(globalEventBus = {}) {
        this.localEventBus = new EventBus(loginEvents);

        this.eView = new EntranceView(this.localEventBus, globalEventBus);
        this.eModel = new EntranceModel(this.localEventBus, globalEventBus);
    }
}