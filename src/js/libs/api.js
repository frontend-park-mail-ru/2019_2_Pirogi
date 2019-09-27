import Network from './network';

export default class Api {

    static login({login, password}) {
        return Network.doPost('/login/', {
            login,
            password,
        });
    }

    static logout(data = {}) {
        return Network.doDelete('/logout/', {
            login: data.login,
            password: data.password,
        });
    }
    static register({login, password, nickname}) {
        return Network.doPost('/users/', {
            login,
            password,
            nickname,
        });
    }
    static editProfile({login, password, nickname, avatar}) {
        const formData = new FormData();

        formData.append('login', login);
        formData.append('password', password);
        formData.append('nickname', nickname);
        formData.append('avatar', avatar);

        return Network.doPutFormData('/users/', formData);
    }

    static getProfileInfo({userID}) {
        return Network.doGet(`/users/${userID}`);
    }

    static getFilmInfo({filmID}) {
        return Network.doGet(`/films/${filmID}`);
    }

    static addNewFilm({title, description, genres, date, actors, directors, rating}) {
        return Network.doPost('/films/', {
            title,
            description,
            genres,
            date,
            actors,
            directors,
            rating,
        });
    }

    static sendReview({filmID, userID, title, description}) {
        return Network.doPost('/reviews/', {
            film_id: filmID,
            user_id: userID,
            title,
            description,
        });
    }

    getReviews() {}
    getFilmList() {}
}