import Network from './network';

export default class Api {

    static login({email, password}) {
        return Network.doPost('/api/login/', {
            email,
            password,
        });
    }

    static authCheck() {
        return Network.doGet('/api/login/');
    }

    static logout() {
        return Network.doPost('/api/logout/', {});
    }

    static register({email, password, name}) {
        return Network.doPost('/api/users/', {
            email,
            password,
            name,
        });
    }

    static editAvatar({avatar, userID}) {
        const formData = new FormData();
        formData.append('upload_file', avatar);
        formData.append('target', 'user');
        formData.append('user_id', userID);
        return Network.doPutFormData('/api/images/', formData);
    }
    
    static editProfile({email, password, name, description}) {
        return Network.doPut('/api/users/', {
            email,
            password,
            name,
            description,
        });
    }

    static getProfileInfo() {
        return Network.doGet('/api/users/');
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