module.exports = class Logger {
    constructor() {
    }

    addError(code, body) {
        if (code === 404) {
            console.log('Error 404: ' + body + ' is not found.');
        } else if (code === 500) {
            console.log('Error 500: Server error.');
        }
    }
};
