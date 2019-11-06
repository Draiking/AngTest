import {RegistrationComponent} from './registration/registration.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [LoginComponent, RegistrationComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        AuthRoutingModule,
        RouterModule
    ]
})
export class AuthModule {

}
