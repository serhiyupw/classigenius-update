import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService  extends DataService {

  constructor(http: HttpClient, globals: GlobalsService)  {
    // console.log("AccountService constructor");
    super('/account', http, globals);
  }
}
