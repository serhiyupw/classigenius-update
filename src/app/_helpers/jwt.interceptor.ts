import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // add authorization header with jwt token if available
      
      //   console.log("intercept");
         let currentUser = this.authenticationService.currentUserValue;
       
       //  console.log("user:"+ currentUser.token);

        if (currentUser && currentUser.token) {
            // console.log("intercept " + currentUser.tokenid);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
       }
    //   console.log( "request="+request);
        return next.handle(request);
     }

    //  constructor() { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    //  //   let currentUser = this.authenticationService.currentUserValue;
       
    //   //  console.log("intercept: user=" + currentUser);
    //     request = request.clone({
    //         setHeaders: {
    //             Authorization: `Bearer 12345`
    //         }
    //     });


    //     return next.handle(request);
    //  }
}