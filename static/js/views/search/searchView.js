import View from "../../libs/view";

export default class SearchView extends View {
    constructor(localEventBus, globalEventBus) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }

    render(root, data = {}) {
        console.log("rendering search page");
        super.render(root,data);
    }

}