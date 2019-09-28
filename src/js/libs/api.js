import Network from './network';

export default class Api {

    static login({login, password}) {
        return Network.doPost('/api/login/', {
            login,
            password,
        });
    }

    static logout() {}

    static register({login, password, nickname}) {
        return Network.doPost('/api/users/', {
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

        return Network.doPutFormData('/api/users/', formData);
    }

    static getProfileInfo({userID}) {
        return Network.doGet(`/api/users/${userID}`);
    }

    static getFilmInfo({filmID}) {
        return Network.doGet(`/api/films/${filmID}`);
    }

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

    static sendReview({filmID, userID, title, description}) {
        return Network.doPost('/api/reviews/', {
            film_id: filmID,
            user_id: userID,
            title,
            description,
        });
    }

    getReviews() {}
    getFilmList() {}
}