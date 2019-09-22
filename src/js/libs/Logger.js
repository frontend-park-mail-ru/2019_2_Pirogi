let module;
/** class*/
module.exports = class Logger {
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
};
