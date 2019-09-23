/** class*/
export default class View {
    /**
   * @param {object} eventBus
   * @param {object} template
     * @param {object} root
   */
    constructor(eventBus, template = {}, root) {
        this.baseElement = root;
        this.eventBus = eventBus;
        this.template = template;
        this.openFlag = false;
    }

    /**
   * @param {object} data
   */
    render(data = {}) {
        console.log('render page...');
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
