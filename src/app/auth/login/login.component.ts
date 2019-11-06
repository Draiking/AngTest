import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    login: string;
    password: string;

    constructor(
        private authservice: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    async send() {

        const user = await this.authservice.getUser(this.login, this.password);
        if (user) {
            localStorage.setItem('login', this.login);
            this.router.navigate(['/table']);
        } else {
            alert('Не правильный логин или пароль.');
        }
    }

}
