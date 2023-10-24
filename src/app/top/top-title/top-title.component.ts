import { iAccount } from './../../account/iAccount';
import { Component, OnInit } from '@angular/core';

import { iUser } from 'src/app/users/iUser';
import { AccountService } from 'src/app/_services/account.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Condition } from 'selenium-webdriver';



@Component({
  selector: 'top-title',
  templateUrl: './top-title.component.html',
  styleUrls: ['./top-title.component.scss']
})
export class TopTitleComponent implements OnInit {


  currentUser: iUser;
  loggedin: boolean;

  account: Partial<iAccount> = {}

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
   }

  ngOnInit(): void {

    this.account.accountid = 0;
  //  this.currentUser = this.authenticationService.currentUserValue;
   // console.log(this.currentUser);  
 

    if (this.currentUser == null) {
      this.loggedin = false;
      return;
    }
    this.loggedin = true;
    //console.log(this.currentUser.accountid);
    this.accountService.get(this.currentUser.accountid)
      .subscribe(
        response => {
          this.account = <iAccount>response;
        //  console.log(this.account);

        })

    _error => {
      console.log('error');
    }

  }

}
