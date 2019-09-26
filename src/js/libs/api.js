import Network from './network';

export default class Api {

    static login(data = {}) {
        return Network.doPost('/login/', {
            login: data['login'],
            password: data['password'],
        });
    }

    logout(data = {}) {
        return Network.doDelete('/logout/', {
            login: data['login'],
            password: data['password'],
        });
    }
    register(data = {}) {
        return Network.doPost('/users/', {
            login: data['login'],
            password: data['password'],
            nickname: data['nickname'],
            rating: 0,
        });
    }
    editProfile(data = {}) {
        const formData = new FormData();

        formData.append('login', data['login']);
        formData.append('password', data['password']);
        formData.append('nickname', data['nickname']);
        formData.append('avatar', data['avatar']);

        return Network.doPutFormData('/users/', formData);
    }

    getProfileInfo() {

    }

    getFilmInfo() {}
    getFilmList() {}
    addNewFilm() {}

    sendReview() {}
    getReviews() {}


}