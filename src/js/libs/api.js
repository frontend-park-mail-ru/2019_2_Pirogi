import Network from './network';

/**
 * Creates a new API object
 * Класс реализует взаимодействие Api c бекендом
 * @class
 * @type {Api}
 */
export default class Api {

    /**
     * API Logging-in
     * POST /api/sessions/
     * @static
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Response>}
     */
    static login({email, password}) {
        return Network.doPost('/api/sessions/', {
            email,
            password,
        });
    }

    /**
     * API Check auth
     * GET /api/sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static authCheck() {
        return Network.doGet('/api/sessions/');
    }

    /**
     * API Logout
     * delete /api/sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static logout() {
        return Network.doDelete('/api/sessions/');
    }

    /**
     * API Registration
     * POST /api/users/
     * @static
     * @param {string} em
     * @param {string} password
     * @param {string} name
     * @returns {Promise<Response>}
     */
    static register({email, password, username}) {
        return Network.doPost('/api/users/', {
            email,
            password,
            username,
        });
    }

    /**
     * API Edit avatar
     * POST /api/images/
     * @static
     * @param {string} avatar - новое изображение
     * @param {string} userID
     * @returns {Promise<Response>}
     */
    static editAvatar({avatar}) {
        const formData = new FormData();
        formData.append('file', avatar.avatar);
        return Network.doPostFormData('/api/users/images/', formData);
    }

    /**
     * API Edit profile
     * PUT /api/users/
     * @static
     * @param {string} email
     * @param {string} description
     * @returns {Promise<Response>}
     */
    static editProfile({username, description}) {
        return Network.doPut('/api/users/', {
            username,
            description,
        });
    }

    /**
     * API Get profile info
     * Отправляет запрос на получение информации о пользователе
     * GET /api/users/
     * @static
     * @returns {Promise<Response>}
     */
    static getProfileInfo() {
        return Network.doGet('/api/users/');
    }
    /**
     * API Get another user info
     * Отправляет запрос на получение информации о пользователе
     * GET /api/users/{user_id}
     * @static
     * @returns {Promise<Response>}
     */
    static getAnotherUserInfo({userID}) {
        return Network.doGet(`/api/users/${userID}`);
    }


    /**
     * API Get film info
     * Отправляет запрос на получение информации о фильме
     * GET /api/films/{film_id}/
     * @static
     * @param {string} filmID
     * @returns {Promise<Response>}
     */
    static getFilmInfo({filmID}) {
        return Network.doGet(`/api/films/${filmID}/`);
    }

    /**
     * API Add new film
     * Отправляет запрос на добавление нового фильма
     * POST /api/films/
     * @static
     * @param {string} title
     * @param {string} description
     * @param {Array} genres
     * @param {string} date
     * @param {Array} actors
     * @param {Array} directors
     * @param {number} rating
     * @returns {Promise<Response>}
     */
    static addNewFilm({title, description, genres, date, actors, directors, rating}) {
        return Network.doPost('/api/films/', {
            title,
            description,
            genres,
            date,
            actors,
            directors,
            rating,
        });
    }

    /**
     * API Send review
     * POST /api/review/
     * Отправляет запрос на добавление новой рецензии
     * @static
     * @param {int} filmID
     * @param {int} userID
     * @param {string} title
     * @param {string} description
     * @returns {Promise<Response>}
     */
    static sendReview({filmID, title, description}) {
        return Network.doPost('/api/reviews/', {
            film_id: filmID,
            title,
            body: description,
        });
    }

    static getPersonInfo({id}) {
        return Network.doGet(`/api/persons/${id}/`);
    }

    static getReviews({filmID, limit, offset}) {
        return Network.doGet(`/api/reviews/${filmID}?limit=${limit}&offset=${offset}`);
    }

    static getList({limit, offset, genres, query, yearmin, yearmax, personsids, persons, countries, orderby, year}) {
        let path = `/api/search?limit=${limit}&offset=${offset}`;
        let data = {
            genres, query, yearmin, yearmax, personsids, persons, countries, orderby, year
        };
        Object.keys(data).forEach((val) => {
            if (data[val]) {
                path += `&${val}=${data[val]}`;
            }
        });

        return Network.doGet(path);
    }

    static getGenres() {
        return Network.doGet('/api/common/genres');
    }

    static getIndex() {
        return Network.doGet('/api/pages');
    }

    static subscribe({id}) {
        return Network.doPost('/api/subscriptions', {
            person_id: id
        });
    }

    static unsubscribe({id}) {
        return Network.doDelete('/api/subscriptions/', {
            person_id: id
        });
    }

    static getSubscribtions() {
        return Network.doGet('/api/subscriptions/');
    }

    static getNewEvents() {
        return Network.doGet('/api/subscriptions/events/');
    }

    static getUsersLists() {
        return Network.doGet('/api/lists');
    }

    static createUsersList({title}) {
        return Network.doPost('/api/lists', {
            title,
        });
    }

    static updateUsersList({title, FilmId}) {
        return Network.doPut('/api/lists', {
            title,
            film_id: FilmId,
        });
    }
}

