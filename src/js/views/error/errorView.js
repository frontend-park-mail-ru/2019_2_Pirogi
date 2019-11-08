import View from '../../libs/view';
import template from './errorView.tmpl.xml';

export default class ErrorView extends View {
    /**
     * @constructor
     * @param {Object} root
     */
    constructor(root = {}) {
        super({}, root, template);
    }
    /**
     * Render the Index view
     * @param {Object} data
     */
    render(data = {}) {
        super.render(data);
    }
}