import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TableRowInterface} from '../interface/tableRow.interface';
import {environment} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(
        private http: HttpClient
    ) {
    }

    getTable(): Observable<TableRowInterface> {
        return this.http.get<TableRowInterface>(environment.url);
    }

}
