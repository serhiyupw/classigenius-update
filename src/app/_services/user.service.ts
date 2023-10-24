import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { catchError, map } from 'rxjs/operators';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(http: HttpClient , globals: GlobalsService) {
    super('/user', http, globals);
  }

  createaccountmanager(object) {
    return this.http.post(`${this.componentBaseUrl}/createaccountmanager.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));
  }

  createastandarduser(object) {
    console.log("createastandarduser");
    return this.http.post(`${this.componentBaseUrl}/createastandarduser.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));
  }

  createintegratoruser(object) {
    console.log("createintegratoruser");
    console.log('${this.componentBaseUrl}/createintegratoruser.php');
    return this.http.post(`${this.componentBaseUrl}/createintegratoruser.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));
  }
}
