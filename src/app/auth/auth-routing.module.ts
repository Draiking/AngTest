import {RegistrationComponent} from './registration/registration.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
})

export class AuthRoutingModule {
    constructor( ) {

    }
}
