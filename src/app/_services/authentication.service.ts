import { NotFoundError } from '../_common/not-found-error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { iUser } from '../users/iUser'
import { BadInput } from '../_common/bad-input';
import { AppError } from '../_common/app-error';
import { GlobalsService } from './globals.service';
// import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<iUser>;
    public currentUser: Observable<iUser>;

   // private baseUrl: string = 'https://sendli365.com/OcrAgent/Api';
  
   private baseUrl: string = this.globals.baseUrl;


    constructor(
        private http: HttpClient,
        private globals: GlobalsService
       ) {
        this.currentUserSubject = new BehaviorSubject<iUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

      
    }

    public get currentUserValue(): iUser {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {

        let obj = { "email": email, "password": password };

     //   console.log(obj);
        let actualURL = this.baseUrl + "/user/login.php";
     //   console.log(actualURL);

        return this.http.post<any>(actualURL, JSON.stringify(obj))
            .pipe(map(user => {
         //       console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));

                this.currentUserSubject.next(user);
                return user;
            },
                catchError(this.handleError)

            ));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    updateuserFullName(fullname: string ){

        const currentUSer  = JSON.parse(localStorage.getItem('currentUser'));
        currentUSer.fullname = fullname;
        localStorage.setItem('currentUser', JSON.stringify(currentUSer));

        this.currentUserSubject.next(currentUSer);
       
    }


    validateActivationCode(activationcode: string, email: string) {

        let obj = { "activationcode": activationcode, "email": email };
        let actualURL = this.baseUrl + "/user/validateactivationcode.php";

        return this.http.post<any>(actualURL, JSON.stringify(obj))
            .pipe(map(response => {
   //             console.log(response);
                return response;

            },
                catchError(this.handleError)

            ));

    }

    requestactivationcode(email: string) {
        let obj = { "email": email };
        let actualURL = this.baseUrl + "/user/requestactivationcode.php";

        return this.http.post<any>(actualURL, JSON.stringify(obj))
            .pipe(map(response => {
   //             console.log(response);
                return response;

            },
                catchError(this.handleError)

            ));
    }


    requestforgotpasswordLink(email: string)
    {
        let obj = { "email": email };
        let actualURL = this.baseUrl + "/user/requestforgotpasswordlink.php";

        return this.http.post<any>(actualURL, JSON.stringify(obj))
            .pipe(map(response => {
 //               console.log(response);
                return response;
            },
                catchError(this.handleError)

            ));
    }

    changepassword(email: string , activationcode: string, password:string)
    {
        let obj = { "email" : email, "activationcode" : activationcode,  "password": password };
        let actualURL = this.baseUrl + "/user/changepassword.php";

        return this.http.post<any>(actualURL, JSON.stringify(obj))
            .pipe(map(response => {
                console.log(response);
                return response;
            },
                catchError(this.handleError)

            ));

    }

    sendactivationemail(email: string)
    {
        let obj = { "email": email };
        let actualURL = this.baseUrl + "/user/sendactivationemail.php";

        return this.http.post<any>(actualURL, JSON.stringify(obj))
            .pipe(map(response => {
                console.log(response);
                return response;
            },
                catchError(this.handleError)

            ));
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error.error);
        if (error.status === 400)
            return throwError(new BadInput(error));


        if (error.status === 404)
            return throwError(new NotFoundError());

        return throwError(new AppError(error));
    }
}
