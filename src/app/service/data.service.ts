import {Injectable} from '@angular/core';
import {TableRowInterface} from '../interface/tableRow.interface';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {



    constructor(
        private http: HttpClient
    ) {
    }

    getTable(): Observable<TableRowInterface> {
        return this.http.get<TableRowInterface>(`${environment.url}bins/15psn9`);
    }

    /*эмуляция получние деталей по id*/
    getDataById(id: number): Promise<TableRowInterface> {
        return new Promise((resolve) => {
            const myCars = JSON.parse(localStorage.getItem('myCars'));
            const data = _.find(myCars, (car) => {
                return car.id === id;
            });
            resolve(data);
        });
    }

    setMyCars(myCars) {
        localStorage.setItem('myCars', JSON.stringify(myCars));
    }


}
