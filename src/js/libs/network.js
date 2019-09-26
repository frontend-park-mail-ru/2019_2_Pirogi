const MY_PATH = 'http://167.71.5.55/api';

export default class Network {

    doGet(path = '/') {
        return fetch(
            MY_PATH + path, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            }
        );
    }

    doPost(path = '/', body = {}) {
        return fetch(
            MY_PATH + path, {
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

    doPostFormData(path = '/', formData) {
        return fetch(
            MY_PATH + path, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: formData,
            }
        );
    }

    doDelete(path = '/') {
        return fetch(
            MY_PATH + path, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',

            }
        );
    }


    doPut(path = '/', body = {}) {
        return fetch(
            MY_PATH + path, {
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

    doPutFormData(path = '/', formData) {
        return fetch(
            MY_PATH + path, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body: formData,
            }
        );
    }
}

