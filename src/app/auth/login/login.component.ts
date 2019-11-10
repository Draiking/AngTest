import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthUserService} from '../../service/auth-user.service';
import {MymodalcomponentComponent} from '../../mymodalcomponent/mymodalcomponent.component';

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
        private authuserservice: AuthUserService,
        public dialog: MatDialog,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    async send() {
        const user = await this.authservice.getUser(this.login, this.password);
        if (user) {
            this.authuserservice.login(this.login, this.password);
            localStorage.setItem('login', this.login);
            this.router.navigate(['/table']);
        } else {
           this.showError('Пароль и логин введены не верно');
        }
    }

    showError(messageText: string) {
        const dialogRef = this.dialog.open(MymodalcomponentComponent, {
            width: '320px',
            data: {data: messageText, isMessage: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}
