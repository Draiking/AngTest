import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableComponent} from './table/table.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { DetailComponent } from './detail/detail.component';
import {MenuItemComponent} from './menu-item/menu-item.component';


@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        HeaderComponent,
        DetailModalComponent,
        DetailComponent,
        MenuItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        AgGridModule.withComponents([]),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatToolbarModule,
        MatMenuModule,

    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [DetailModalComponent]
})
export class AppModule {
}
