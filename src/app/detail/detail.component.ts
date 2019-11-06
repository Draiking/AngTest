import {Component, Input, OnInit} from '@angular/core';
import {TableRowInterface} from '../interface/tableRow.interface';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../data.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    @Input() data: any;

    car: TableRowInterface;
    id: number;

    constructor(
        private activateRoute: ActivatedRoute,
        private dataService: DataService
    ) {
        this.id = this.activateRoute.snapshot.params.id;

    }

    ngOnInit() {
        if (this.data) {
            this.car = this.data.table;
        } else {
            this.getDataById();
        }
    }

    async getDataById() {
        this.car = await this.dataService.getDataById(this.id);
    }

}
