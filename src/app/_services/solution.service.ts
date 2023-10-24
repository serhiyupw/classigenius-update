import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionService extends DataService{  

  constructor(http: HttpClient , globals: GlobalsService) {
    super('/solution', http, globals);
  }
}
