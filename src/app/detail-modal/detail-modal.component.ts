import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent{

    constructor(
        public dialogRef: MatDialogRef<DetailModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any)
    {

    }


    onNoClick(): void {
        this.dialogRef.close();
    }

}