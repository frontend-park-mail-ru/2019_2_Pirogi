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
     * POST /api/login/
     * @static
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Response>}
     */
    static login({email, password}) {
        return Network.doPost('/api/login/', {
            email,
            password,
        });
    }

    /**
     * API Check auth
     * GET /api/login/
     * @static
     * @returns {Promise<Response>}
     */
    static authCheck() {
        return Network.doGet('/api/login/');
    }

    /**
     * API Logout
     * POST /api/logout/
     * @static
     * @returns {Promise<Response>}
     */
    static logout() {
        return Network.doPost('/api/logout/', {});
    }

    /**
     * API Registration
     * POST /api/users/
     * @static
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * @returns {Promise<Response>}
     */
    static register({email, password, name}) {
        return Network.doPost('/api/users/', {
            email,
            password,
            name,
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
    static editAvatar({avatar, userID}) {
        const formData = new FormData();
        formData.append('upload_file', avatar.avatar);
        formData.append('target', 'user');
        formData.append('user_id', userID);
        return Network.doPostFormData('/api/images/', formData);
    }

    /**
     * API Edit profile
     * PUT /api/users/
     * @static
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * @param {string} description
     * @returns {Promise<Response>}
     */
    static editProfile({email, password, name, description}) {
        return Network.doPut('/api/users/', {
            email,
            password,
            name,
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
     * API Get film info
     * Отправляет запрос на получение информации о фильме 
     * GET /api/films/{film_id}/
     * @static
     * @param {string} filmID
     * @returns {Promise<Response>}
     */
    static getFilmInfo({filmID}) {
        return Network.doGet(`/api/films/${filmID}`);
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
    static sendReview({filmID, userID, title, description}) {
        return Network.doPost('/api/reviews/', {
            film_id: filmID,
            user_id: userID,
            title,
            description,
        });
    }
}