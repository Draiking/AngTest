import {Injectable} from '@angular/core';
import {TableRowInterface} from './interface/tableRow.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {
    }


    getDataById(id): Promise<TableRowInterface> {
        return new Promise((resolve) => {
            const data: TableRowInterface = {
                make: 'ford',
                model: 'focus',
                price: 35000,
                id: 1
            };
            resolve (data);
        });
    }


}
