import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TableRowInterface} from '../interface/tableRow.interface';
import {MatDialog} from '@angular/material/dialog';
import {DetailModalComponent} from '../detail-modal/detail-modal.component';
import * as _ from 'lodash';
import {TableService} from '../service/table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {DataService} from '../data.service';

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
    currentID: number;

    current: TableRowInterface;

    private components;


    rowData: any = [];


    constructor(
        private tableservice: TableService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private dataservice: DataService
    ) {
        console.log(this.route.snapshot.queryParams);

    }

    ngOnInit() {
        this.tableservice.getTable()
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
                    cellEditor: 'numericCellEditor',
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
        this.components = {numericCellEditor: this.getNumericCellEditor()};
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

        _.each(event.data, (prop, index) => {
            if (prop.toString().length === 0) {
                event.data[index] = this.oldData[index];
            } else {
                event.data[index] = prop.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            }
        });
        this.refreshTable();
        this.gridApi.stopEditing();
        this.current = undefined;
        this.oldData = undefined;
        console.log(event);
    }

    saveTable() {

        _.each(this.current, (prop, index) => {
            if (prop.toString().length === 0) {
                this.current[index] = this.oldData[index];
            } else {
                this.current[index] = prop.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            }
        });
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
        const dialogRef = this.dialog.open(DetailModalComponent, {
            width: '600px',
            data: {table: data}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    showError(messageText: string) {
        const dialogRef = this.dialog.open(ErrorMessageComponent, {
            width: '320px',
            data: {message: messageText}
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

    /*написание только цифр в цене*/
    getNumericCellEditor() {
        function isCharNumeric(charStr) {
            return !!/\d/.test(charStr);
        }

        function isKeyPressedNumeric(event) {
            const charCode = getCharCodeFromEvent(event);
            const charStr = String.fromCharCode(charCode);
            return isCharNumeric(charStr);
        }

        function getCharCodeFromEvent(event) {
            event = event || window.event;
            return typeof event.which === 'undefined' ? event.keyCode : event.which;
        }

        function NumericCellEditor() {
        }

        NumericCellEditor.prototype.init = function(params) {
            this.focusAfterAttached = params.cellStartedEdit;
            this.eInput = document.createElement('input');
            this.eInput.style.width = '100%';
            this.eInput.style.height = '100%';
            this.eInput.value = isCharNumeric(params.charPress) ? params.charPress : params.value;
            const that = this;
            this.eInput.addEventListener('keypress', (event) => {
                if (!isKeyPressedNumeric(event)) {
                    that.eInput.focus();
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                }
            });
        };
        NumericCellEditor.prototype.getGui = function() {
            return this.eInput;
        };
        NumericCellEditor.prototype.afterGuiAttached = function() {
            if (this.focusAfterAttached) {
                this.eInput.focus();
                this.eInput.select();
            }
        };
        NumericCellEditor.prototype.isCancelBeforeStart = function() {
            return this.cancelBeforeStart;
        };
        NumericCellEditor.prototype.isCancelAfterEnd = () => {
        };
        NumericCellEditor.prototype.getValue = function() {
            return this.eInput.value;
        };
        NumericCellEditor.prototype.focusIn = function() {
            const eInput = this.getGui();
            eInput.focus();
            eInput.select();
            console.log('NumericCellEditor.focusIn()');
        };
        NumericCellEditor.prototype.focusOut = () => {
            console.log('NumericCellEditor.focusOut()');
        };
        return NumericCellEditor;
    }


    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
