/**
 * Create a new logger
 * @type {Logger}
 */
module.exports = class Logger {
    /**
     * @constructor
     */
    constructor() {
    }

    /**
     * Log the error to console
     * @param {number} code
     * @param {string} body
     */
    logError(code, body) {
        if (code === 404) {
            console.log('Error 404: ' + body + ' is not found.');
        } else if (code === 500) {
            console.log('Error 500: Server error.');
        } else {
            console.log('Error' + code);
        }
    }

    /**
     * Log the error from EventBus
     * @param {string} body
     * @method
     * @static
     */
    logEventBusError(body) {
        console.log('Error EventBus: ' + body);
    }

    /**
     * Log the error from template rendering
     * @param {string} body
     */
    logRenderError(body) {
        console.log('Error Render: Can\'t render ' + body);
    }
};
