
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotificationsService } from '../shared/services/notifications/notifications.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    protected adminTable = [
        {   
            login:'ricksanchez',
            password:'rick123',
            name:'Rick Sanchez',
            role:'super-user',
            token:'cmlja3NhbmNoZXoucmljazEyMw=='
        },
        {
            login:'mortysmith',
            password:'morty123',
            name:'Morty Smith',
            role:'normal-user',
            token:'c3VtbWVyc21pdGguc3VtbWVyMTIz'
        }
    ]; 


    constructor(
        private router: Router,
        private notification: NotificationsService
    ) { }

    doLogin(login: string, pwd: string){

        let index = this.adminTable.findIndex(el => el.login === login);
        
        if(index > -1){
            if(this.adminTable[index].password === pwd){
                localStorage.setItem('user',JSON.stringify({
                    name: this.adminTable[index].name,
                    login: this.adminTable[index].login,
                    role: this.adminTable[index].role,
                    token: this.adminTable[index].token
                }));
                this.router.navigate(['/home']);
            }else
                this.notification.warn('Atenção!','Senha Incorreta');     
        
        } else this.notification.warn('Atenção!','Usuário Incorreto');
    }

    doLogout(){
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
    }

    get isLoggedIn(){
        const user: any = JSON.parse(localStorage.getItem('user') || 'null');
        return (user !== null) ? true : false;
    }

    getRole() {
        let dadosUser: any = JSON.parse(localStorage.getItem('user') || 'null');
        return dadosUser.role;
    }
}
