import { AccountService } from './../../_services/account.service';
import { iAccount } from './../iAccount';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from 'src/app/users/iUser';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {


  accounts: iAccount[];
  currentUser: iUser;

  constructor(
    private router: Router,
    private service: AccountService,
    public confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    this.service.getAll()
    .subscribe(
      response => {
        this.accounts = <iAccount[]>response;
    
      },
      error => {
        alert('Error');
        console.log('error');
      })

  }


  accountRoute(accountid: number, route: string) {
 //   console.log(accountid);
    this.router.navigate(['/account', accountid], { queryParams: { returnUrl: route } });
  }


  delete(account: iAccount) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {
        if (dialogResult) {
          this.service.delete(account.accountid)
            .subscribe(response => {
              let index = this.accounts.indexOf(account);
              this.accounts.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }


}
