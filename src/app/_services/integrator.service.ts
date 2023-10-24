import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class IntegratorService extends DataService{

  constructor(http: HttpClient, globals: GlobalsService)  {
    super('/integrator', http, globals);
  }
}
