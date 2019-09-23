/** class*/
export default class View {
    /**
   * @param {object} eventBus
   * @param {object} template
   */
    constructor(eventBus, template = {}) {
        this.baseElenemt = document.createElement('div');
        this.eventBus = eventBus;
        this.template = template;
        this.openFlag = false;
    }

    /**
   * @param {object} root
   * @param {object} data
   */
    render(root, data = {}) {
        console.log('render page...');
        this.baseElement = root;
        this.openFlag = true;
        this.baseElement.innerHTML = this.template(data);
    }

    /** function */
    hide() {
        this.baseElement.hidden = true;
        this.baseElement.innerHTML = '';
        console.log('hidding');
    }

    /** function */
    close() {
        if (this.openFlag) {
            console.log('closing...');
        }
    }
}
