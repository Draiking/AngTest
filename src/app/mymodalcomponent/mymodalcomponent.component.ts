import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-mymodalcomponent',
    templateUrl: './mymodalcomponent.component.html',
    styleUrls: ['./mymodalcomponent.component.scss']
})
export class MymodalcomponentComponent implements OnInit {

    isMessage: boolean;
    obj: any;


    constructor(
        public dialogRef: MatDialogRef<MymodalcomponentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { data: any, isMessage: boolean}) {
        this.isMessage = this.data.isMessage;
        this.obj = this.data.data;
    }

    ngOnInit() {

    }


    onNoClick(): void {
        this.dialogRef.close();
    }

}
