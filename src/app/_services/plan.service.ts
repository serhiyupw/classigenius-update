import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { catchError, map } from 'rxjs';
import { GlobalsService } from './globals.service';


@Injectable({
  providedIn: 'root'
})
export class PlanService  extends DataService {

  constructor(http: HttpClient, globals: GlobalsService) {
    super('/plan', http, globals);
  }

  getByPlanTypeDefault(plantypedefault)
  {
    let obj = {
        "filtercolumn": "plantypedefault",
        "filtervalue": plantypedefault,
    }

    return this.http.post(`${this.componentBaseUrl}/read_single_by_plantypedefault.php`, JSON.stringify(obj))
          .pipe(map(response => response, catchError(this.handleError)));
  }
}