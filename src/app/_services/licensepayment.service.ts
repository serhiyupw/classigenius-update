
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { catchError, map } from 'rxjs';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class LicensepaymentService  extends DataService{  

  constructor(http: HttpClient, globals : GlobalsService) {
    super('/licensepayment', http,globals);
  }




  createupdate(object) {
    return this.http.post(`${this.componentBaseUrl}/createupdate.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));

  }

  deletependingpayments() {
    let obj = {};
    return this.http.post(`${this.componentBaseUrl}/deletependingpayments.php`, JSON.stringify(obj))
      .pipe(map(response => response, catchError(this.handleError)));

  }

  generatenesinglelicensepayment(object)
  {
   
    return this.http.post(`${this.componentBaseUrl}/generatenesinglelicensepayment.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));
  }

}

