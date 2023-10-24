import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends DataService{

  constructor(http: HttpClient, globals: GlobalsService) {
    super('/project', http, globals);
  }

 
}
