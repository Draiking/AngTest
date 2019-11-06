import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableRowInterface} from '../interface/tableRow.interface';
import {MatDialog} from '@angular/material/dialog';
import {DetailModalComponent} from '../detail-modal/detail-modal.component';
import * as _ from 'lodash';
import {TableService} from '../service/table.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

    HTMLData: string;
    theHtmlString: string;

    columnDefs: any;
    gridApi: any;
    gridColumnApi: any;
    current: TableRowInterface;


    rowData: any = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];


    constructor(
        private tableservice: TableService,
        public dialog: MatDialog
    ) {
    }

    async ngOnInit() {
        this.rowData = await this.tableservice.getTable();
        let i = 1;
        for (const item of this.rowData) {
            item.action = 'изменить';
            item.delete = 'удалить';
            item.modal = 'показать';
            item.id = i;
            i++;
        }
        console.log(this.rowData);
    }

    columnWidth(percentage) {
        const parent = document.getElementById('container');
        if (parent) {
            const width = parent.offsetWidth * percentage / 100;  // Pixel calculation
            return width;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const parent = document.getElementById('container');
            this.columnDefs = [
                {
                    headerName: 'make',
                    field: 'make',
                    sortable: true,
                    filter: true,
                    checkboxSelection: true,
                    enablePivot: true,
                    editable: true,
                    width: this.columnWidth(30)
                },
                {headerName: 'model', field: 'model', sortable: true, filter: true, editable: true, width: this.columnWidth(20)},
                {headerName: 'price', field: 'price', sortable: true, filter: true, editable: true, width: this.columnWidth(20)},
                {
                    headerName: 'action', field: 'action', cellRenderer: (params) => {
                        return `<i class="material-icons">create</i> ${params.value}`;
                    }, width: this.columnWidth(12)
                },
                {
                    headerName: 'detail', field: 'modal', cellRenderer: (params) => {
                        return `<i class="material-icons">slideshow</i>`;
                    }, width: this.columnWidth(9)
                },
                {
                    headerName: 'delete', field: 'delete', cellRenderer: (params) => {
                        return `<i class="material-icons">delete</i>`;
                    }, width: this.columnWidth(9)
                },
            ];
        }, 100);
    }

    onCellClicked(event) {
        if (event.colDef.field === 'action') {
            this.current = event.data;
            console.log(event.data);
        }

        if (event.colDef.field === 'modal') {
            this.openDialog(event.data);
        }

        if (event.colDef.field === 'delete') {
            this.deleteRow(event.data);
        }

    }

    saveTable() {
        _.each(this.current, (prop, index) => {
            this.current[index] = prop.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        });
        for (let item of this.rowData) {
            if (item.id === this.current.id) {
                item = this.current;
            }
        }
        this.refreshTable();
        this.current = undefined;
        console.log(this.current);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    }

    refreshTable() {
        const params = {force: true};
        this.gridApi.refreshCells(params);
    }

    openDialog(data: TableRowInterface): void {
        const dialogRef = this.dialog.open(DetailModalComponent, {
            width: '600px',
            data: {table: data}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }


    deleteRow(data) {
        this.rowData = _.filter(this.rowData, (item) => {
            return item.id !== data.id;
        });
    }

    addHTML() {
        this.theHtmlString = this.HTMLData;
    }

}
