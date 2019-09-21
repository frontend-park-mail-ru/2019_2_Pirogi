import View from '../../libs/view';


export default class IndexView extends View {
    constructor(localEventBus, globalEventBus = {}) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

    }

    render(root, data) {
        super.render(root, data);
    }
}