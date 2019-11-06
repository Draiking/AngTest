import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    login: string;
    password: string;
    passwordCurrent: string;

    constructor() {
    }

    ngOnInit() {
    }

    createUser() {
        const user = [
            this.login,
            this.password,
            this.passwordCurrent
        ];
        localStorage.setItem('AngTst', JSON.stringify(user));
    }

}
