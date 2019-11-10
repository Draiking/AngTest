import * as md5 from 'md5';

export class AuthUserService {


    login(login, password) {
        localStorage.setItem('isAuthenticated', md5(`${login}${password}`));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('isAuthenticated') === 'ca2ee8a63cacfe08aa8aa4eddeb1bff2';
    }


}
