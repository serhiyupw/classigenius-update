// import { ContactService } from '../_services/contact.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
        
            const currentTime = new Date().getTime();
       
         //   console.log(currentTime + '-' + currentUser.tokenexpiration * 1000);
            if (currentTime <= currentUser.tokenexpiration * 1000) {
                return true;

            }
            else
            {
                console.log('token expired');
            }
        }

 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    isAdmin() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (currentUser.usertype == 5) {
                return true;
            }
        }
        // not admin user
        return false;
    }
}