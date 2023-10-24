import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { catchError, map } from 'rxjs';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseService  extends DataService{ 

  constructor(http: HttpClient , globals: GlobalsService ) {
    super('/license', http,globals);
  }

  
  generatetriallicense(plantypedefault : string) {
    let object = {
      plantypedefault : plantypedefault
    }
     return this.http.post(`${this.componentBaseUrl}/generatetriallicense.php`, JSON.stringify(object))
       .pipe(map(response => response, catchError(this.handleError)));
  }

  
  generatenewlicensebasedonplan(object) {
    return this.http.post(`${this.componentBaseUrl}/generatenewlicensebasedonplan.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));

  }

  
  generatenemultilicenses(object) {
    return this.http.post(`${this.componentBaseUrl}/generatenemultilicenses.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));

  }
  

  cancelpayment() {
    let object = {
    
    }
    return this.http.post(`${this.componentBaseUrl}/cancelpayment.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));

  }

  emailLicense(licenseid: number) {
    let obj = {
      "licenseid": licenseid
    }
    return this.http.post(`${this.componentBaseUrl}/emaillicense.php`, JSON.stringify(obj))
      .pipe(map(response => response, catchError(this.handleError)));

  }
  
}
