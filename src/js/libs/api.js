import Network from './network';

/**
 * Класс реализует взаимодействие Api c бекендом
 */
export default class Api {

    /**
     * Отправляет запрос на вход
     * @param {string} email - email пользователя
     * @param {string} password - пароль пользователя
     * @returns {Promise<Response>}
     */
    static login({email, password}) {
        return Network.doPost('/api/login/', {
            email,
            password,
        });
    }

    /**
     * Отправляет запрос на проверку аунтификации пользователя
     * @returns {Promise<Response>}
     */
    static authCheck() {
        return Network.doGet('/api/login/');
    }

    /**
     * Отправляет запрос на выход из сессии
     * @returns {Promise<Response>}
     */
    static logout() {
        return Network.doPost('/api/logout/', {});
    }

    /**
     * Отправляет запрос на регистрацию
     * @param {string} email - email пользователя
     * @param {string} password - пароль пользователя
     * @param {string} name - имя пользователя
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
     * Отправляет запрос на изменение аватарки
     * @param avatar - новое изображение
     * @param userID - идентификатор пользователя
     * @returns {Promise<Response>}
     */
    static editAvatar({avatar, userID}) {
        const formData = new FormData();
        formData.append('upload_file', avatar);
        formData.append('target', 'user');
        formData.append('user_id', userID);
        return Network.doPutFormData('/api/images/', formData);
    }

    /**
     * Отправляет запрос на изменение данных профиля
     * @param {string} email - email пользователя
     * @param {string} password - пароль пользователя
     * @param {string} name - имя пользователя
     * @param {string} description - о себе
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
     * Отправляет запрос на получение информации о пользователе
     * @returns {Promise<Response>}
     */
    static getProfileInfo() {
        return Network.doGet('/api/users/');
    }

    /**
     * Отправляет запрос на получение информации о фильме
     * @param {string} filmID
     * @returns {Promise<Response>}
     */
    static getFilmInfo({filmID}) {
        return Network.doGet(`/api/films/${filmID}`);
    }

    /**
     * Отправляет запрос на добавление нового фильма
     * @param {string} title - название
     * @param {string} description - описание
     * @param {slice} genres - жанры
     * @param {string} date - дата
     * @param {slice} actors - актеры
     * @param {slice} directors - режиссеры
     * @param {number} rating - рейтинг
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
     * Отправляет запрос на добавление новой рецензии
     * @param {string} filmID - идентификатор фильма
     * @param {string} userID - идентифекатор пользователя
     * @param {string} title - название
     * @param {string} description - содержание
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