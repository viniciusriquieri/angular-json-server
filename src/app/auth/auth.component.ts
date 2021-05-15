import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../shared/services/notifications/notifications.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {

    public pwdVisible = false;
    
    
    formLogin: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthService, 
        private notification: NotificationsService
    ) { 
        this.formLogin = this.formBuilder.group({
			login: ['', Validators.required],
			password: ['', Validators.required]
		});
    }

    ngOnInit(): void {
    }

    login = (data: any) => {
        this.checkLogin(data.login,data.password);
        this.authService.doLogin(data.login,data.password);
    }

    checkLogin = (email: string, pwd: string) => {
        if(email == ''){
            this.notification.warn('Atenção!','Insira o e-mail!')
            return;
        }
        if(pwd == ''){
            this.notification.warn('Atenção!','Insira a senha!')
            return;
        }
    }


}
