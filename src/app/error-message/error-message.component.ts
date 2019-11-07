import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss']
})

export class ErrorMessageComponent implements OnInit {


    message: string;

    constructor(
        public dialogRef: MatDialogRef<ErrorMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(this.data);
        this.message = this.data.message;
    }


    onNoClick(): void {
        this.dialogRef.close();

    }

    ngOnInit(): void {
    }

}
