import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TableRowInterface} from '../interface/tableRow.interface';
import {MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DataService} from '../service/data.service';
import {MymodalcomponentComponent} from '../mymodalcomponent/mymodalcomponent.component';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

    unsubscribeAll = new Subject();
    oldData: TableRowInterface;
    HTMLData: string;
    theHtmlString: string;
    columnDefs: any;
    gridApi: any;
    gridColumnApi: any;
    currentID = 1;
    current: TableRowInterface;
    rowData: any = [];


    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private dataservice: DataService
    ) {
        console.log(this.route.snapshot.queryParams);

    }

    ngOnInit() {
        this.dataservice.getTable()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((res) => {
                    this.rowData = res;
                    let i = 1;
                    for (const item of this.rowData) {
                        item.id = i;
                        i++;
                    }
                    this.dataservice.setMyCars(this.rowData);
                    if (this.route.snapshot.queryParams.id) {
                        const data = this.rowData[this.route.snapshot.queryParams.id];
                        this.openDialog(data);
                        console.log(data);
                    }
                },
                (error => {
                    this.showError('Ошибка получения данных');
                    console.log(error);
                }));

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
                {
                    headerName: 'price',
                    field: 'price',
                    type: 'number',
                    sortable: true,
                    filter: true,
                    editable: true,
                    width: this.columnWidth(20)
                },
                {
                    headerName: 'action', field: 'action', cellRenderer: (params) => {
                        return `<i class="material-icons">create</i>`;
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
        this.oldData = _.cloneDeep(event.data);

        if (event.colDef.field === 'action') {
            this.current = event.data;
            this.oldData = _.cloneDeep(event.data);

            console.log(event.data);
        }

        if (event.colDef.field === 'modal') {
            this.router.navigate(['/table'], {
                queryParams: {id: event.data.id}
            });
            this.openDialog(event.data);
        }

        if (event.colDef.field === 'delete') {
            this.deleteRow(event.data);
        }

    }

    onEditingStop(event) {
        this.validationAndUpdateField(event.data);
        this.refreshTable();
        this.gridApi.stopEditing();
        this.current = undefined;
        this.oldData = undefined;
        console.log(event);
    }

    saveTable() {

        this.validationAndUpdateField(this.current);

        for (let item of this.rowData) {
            if (item.id === this.current.id) {
                item = this.current;
            }
        }
        this.refreshTable();
        this.current = undefined;
        this.oldData = undefined;
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
        this.currentID = data.id;
        const dialogRef = this.dialog.open(MymodalcomponentComponent, {
            width: '600px',
            data: {data, isMessage: false}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/table']);
            console.log('The dialog was closed');
        });
    }

    showError(messageText: string) {
        const dialogRef = this.dialog.open(MymodalcomponentComponent, {
            width: '320px',
            data: {data: messageText, isMessage: true}
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

    replaceString(str) {
        return str.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    }

    validationAndUpdateField(data) {
        _.each(data, (prop, index) => {
            if (prop && prop.toString().length === 0) {
                data[index] = this.oldData[index];
            } else {
                if (index === 'price' && (!prop || !(+prop > 0))) {
                    data[index] = 0;
                } else {
                    data[index] = this.replaceString(prop);
                }
            }
        });
    }


    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
