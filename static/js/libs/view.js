export default class View {
    constructor(eventBus, template) {
        this.el = document.createElement('div')
        this.eventBus = eventBus;
        this.template = template;
        this.openFlag = false;
            
    }

    render(root, data = {}) {
        console.log("render page...");
        this.el = root;
        this.openFlag = true;
    }

    hide() {
        this.el.hidden = true;
        this.el.innerHTML = "";
        console.log("hidding");
    }

    close() {
        if (this.openFlag) {
            console.log("closing...");
        }
    }
}