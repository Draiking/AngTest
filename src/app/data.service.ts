import {Injectable} from '@angular/core';
import {TableRowInterface} from './interface/tableRow.interface';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class DataService {



    constructor() {
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
