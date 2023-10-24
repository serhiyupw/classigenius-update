import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { catchError, map } from 'rxjs/operators';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService {

  constructor(http: HttpClient , globals: GlobalsService) {
    super('/order', http, globals);
  }

  updatePaid(object) {
    return this.http.post(`${this.componentBaseUrl}/updatepaid.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));

  }

  updatePaid1(object) {
    return this.http.post(`${this.componentBaseUrl}/updatepaid1.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));

  }
}
