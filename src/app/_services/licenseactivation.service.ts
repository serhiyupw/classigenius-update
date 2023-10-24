import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})

export class LicenseactivationService  extends DataService{   


  constructor(http: HttpClient , globals: GlobalsService ) {
    super('/licenseactivation', http,globals);
  }



}
