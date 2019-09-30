const MY_PATH = 'http://167.71.5.55';
/**
 * Creates a new Network object
 * @class
 * @type {Network}
 */
export default class Network {

    /**
     * GET request
     * @static
     * @param {string} path
     * @returns {Promise<Response>}
     */
    static doGet(path = '/') {
        return fetch(MY_PATH + path, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        });
    }

    /**
     * POST request
     * @static
     * @param {string} path
     * @param {Object} body
     * @returns {Promise<Response>}
     */
    static doPost(path = '/', body = {}) {
        return fetch(MY_PATH + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }

    /**
     * POST form-data request
     * @param {string} path
     * @static
     * @param {Object} formData
     * @returns {Promise<Response>}
     */
    static doPostFormData(path = '/', formData) {
        return fetch(MY_PATH + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        });
    }

    /**
     * DELETE request
     * @static
     * @param {string} path
     * @returns {Promise<Response>}
     */
    static doDelete(path = '/') {
        return fetch(MY_PATH + path, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
        });
    }


    /**
     * PUT request
     * @static
     * @param {string} path
     * @param {Object} body
     * @returns {Promise<Response>}
     */
    static doPut(path = '/', body = {}) {
        return fetch(MY_PATH + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }

    /**
     * PUT form-data request
     * @param {string} path
     * @param {Object} formData
     * @returns {Promise<Response>}
     */
    static doPutFormData(path = '/', formData) {
        return fetch(MY_PATH + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        });
    }
}

