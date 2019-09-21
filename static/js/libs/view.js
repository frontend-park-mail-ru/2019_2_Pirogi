export default class View {
    constructor(eventBus, template = {}) {
        this.baseElenemt = document.createElement('div');
        this.eventBus = eventBus;
        this.template = template;
        this.openFlag = false;
    }

    render(root, data = {}) {
        console.log('render page...');
        this.baseElement = root;
        this.openFlag = true;
        //this.el.innerHTML = template(data);
    }

    hide() {
        this.baseElement.hidden = true;
        this.baseElement.innerHTML = '';
        console.log('hidding');
    }

    close() {
        if (this.openFlag) {
            console.log('closing...');
        }
    }
}