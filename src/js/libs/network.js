const MY_PATH = 'http://167.71.5.55';

export default class Network {

    static doGet(path = '/') {
        return fetch(MY_PATH + path, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }
        );
    }

    static doPost(path = '/', body = {}) {
        return fetch(MY_PATH + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }
        );
    }

    static doPostFormData(path = '/', formData) {
        return fetch(MY_PATH + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        }
        );
    }

    static doDelete(path = '/') {
        return fetch(MY_PATH + path, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',

        }
        );
    }


    static doPut(path = '/', body = {}) {
        return fetch(MY_PATH + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }
        );
    }

    static doPutFormData(path = '/', formData) {
        return fetch(MY_PATH + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        }
        );
    }
}

