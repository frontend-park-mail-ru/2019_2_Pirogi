/** class*/
module.export = class Logger {
    /** constructor*/
    constructor() {}

    /**
   * @param {number} code
   * @param {string} body
   */
    logError(code, body) {
        if (code === 404) {
            console.log('Error 404: ' + body + ' is not found.');
        } else if (code === 500) {
            console.log('Error 500: Server error.');
        }
    }

    /**
   * @param {string} body
   */
    logEventBusError(body) {
        console.log('Error EventBus: ' + body);
    }

    /**
   * @param {string} body
   */
    logRenderError(body) {
        console.log('Error Render: Can\'t render ' + body);
    }
};
