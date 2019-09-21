import View from '../../libs/view';

export default class SearchResultsView extends View {
    constructor(localEventBus, globalEventBus) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;
    }

    render(root, data = {}) {
        console.log('rendering searchResults page');
        super.render(root, data);
    }
}
