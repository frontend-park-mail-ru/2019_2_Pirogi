import Network from './network';

export default class Api {

    static login(data = {}) {
        return Network.doPost('/login/', {
            login: data.login,
            password: data.password,
        });
    }

    static logout(data = {}) {
        return Network.doDelete('/logout/', {
            login: data.login,
            password: data.password,
        });
    }
    static register(data = {}) {
        return Network.doPost('/users/', {
            login: data.login,
            password: data.password,
            nickname: data.nickname,
        });
    }
    static editProfile(data = {}) {
        const formData = new FormData();

        formData.append('login', data.login);
        formData.append('password', data.password);
        formData.append('nickname', data.nickname);
        formData.append('avatar', data.avatar);

        return Network.doPutFormData('/users/', formData);
    }

    static getProfileInfo(data = {}) {
        return Network.doGet(`/users/${data.userID}`);
    }

    static getFilmInfo(data = {}) {
        return Network.doGet(`/films/${data.filmID}`);
    }

    static addNewFilm(data = {}) {
        return Network.doPost('/films/', {
            title: data.title,
            description: data.description,
            genres: data.genres,
            date : data.date,
            actors: data.actors,
            directors: data.directors,
            rating: data.rating,
        });
    }

    static sendReview(data = {}) {
        return Network.doPost('/reviews/', {
            film_id: data.filmID,
            user_id: data.userID,
            title: data.title,
            description: data.description,
        });
    }

    getReviews() {}
    getFilmList() {}
}