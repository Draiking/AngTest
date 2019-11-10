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
import {DetailComponent} from './detail/detail.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {AuthUserService} from './service/auth-user.service';
import {AuthGuard} from './service/auth.guard';
import { MymodalcomponentComponent } from './mymodalcomponent/mymodalcomponent.component';


@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        HeaderComponent,
        DetailComponent,
        MenuItemComponent,
        MymodalcomponentComponent,
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
    providers: [AuthUserService, AuthGuard],
    bootstrap: [AppComponent],
    entryComponents: [
        MymodalcomponentComponent
    ]
})
export class AppModule {
}
