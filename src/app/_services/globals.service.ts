import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotFoundError, catchError, map, throwError } from 'rxjs';
import { BadInput } from '../_common/bad-input';
import { AppError } from '../_common/app-error';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public baseUrl: string = 'https://sendli365.com/OcrAgentdev/Api';



  constructor(
      protected http: HttpClient,
  ) 
  {
  }

  get(id) {
    let obj = { "id": id };

    return this.http.post(`${this.baseUrl}/globals/read_single.php`, JSON.stringify(obj))
      .pipe(map(response => response, catchError(this.handleError)));
  }

  update(object) {
    let obj = {};
    return this.http.post(`${this.baseUrl}/globals/update.php`, JSON.stringify(object))
      .pipe(map(response => response, catchError(this.handleError)));
  }


  protected handleError(error: Response) {

    return throwError(() => new AppError(error));
  }


}
