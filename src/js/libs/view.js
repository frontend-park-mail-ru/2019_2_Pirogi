/**
 * Creates a new View model. Used for extension other views.
 * @class
 * @type {View}
 */
export default class View {
    /**
     * @constructor
     * @param {object} eventBus
     * @param {function} template
     * @param {object} root
     */
    constructor(eventBus = {}, root = {}, template) {
        this.baseElement = root;
        this.eventBus = eventBus;
        this.template = template;
        this.openFlag = false;
    }

    /**
     * Renders the template
     * @param {object} data
     */
    render(data = {}) {
        this.openFlag = true;
        this.baseElement.innerHTML = this.template(data);
    }

    /**
     * Hides the rendered page
     * @method
     * @static
     */
    hide() {
        // this.baseElement.hidden = true;
        // this.baseElement.innerHTML = '';
    }

    /**
     * Close smth idk
     * @method
     */
    close() {
    }
}
