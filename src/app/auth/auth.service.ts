import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }


    getUser(login, password: string): Promise<any> {
        debugger;
        return this.http.get('assets/db.json').toPromise()
            .then((res: any) => {
                if (res && res.user && res.user.login === login && res.user.password === password) {
                    return res.user;
                } else  {
                    return false;
                }
            });
    }
}
