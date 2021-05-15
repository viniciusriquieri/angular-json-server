import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService, 
        private router: Router
    ){

    }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            let url: string = state.url;
            return this.checkUserLogin(next, url);
        }


        checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
            if (this.authService.isLoggedIn) {
                const userRole = this.authService.getRole();
                if (route.data.role && route.data.role.indexOf(userRole) === -1) {
                    this.router.navigate(['/home']);
                    return false;
                }
                return true;
            }
        
            this.router.navigate(['/auth']);
            return false;
        }


}
