import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(private http: HttpClient) {
    }

    getTable() {
        return this.http.get('https://api.myjson.com/bins/15psn9').toPromise();
    }

}
