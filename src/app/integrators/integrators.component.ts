
import { Component, OnInit } from '@angular/core';
import { IntegratorService } from '../_services/integrator.service';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';
import { iIntegrator } from './iIntegrator';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { iAccount } from '../account/iAccount';
import { iUser } from '../users/iUser';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'integrators',
  templateUrl: './integrators.component.html',
  styleUrls: ['./integrators.component.scss']
})
export class IntegratorsComponent implements OnInit {


  currentUser: iUser;
  integrators: iIntegrator[];
  integratorsFiltered: iIntegrator[];
  accounts: iAccount[] = [];

  constructor(
    private router: Router,
    private service: IntegratorService,
    public confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
    private accountService: AccountService) { 
     this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
    }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        response => {
          this.integrators = <iIntegrator[]>response;
          this.OnAccountSelect(0);
        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.accountService.getAll()
      .subscribe(
        response => {
          this.accounts = <iAccount[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  OnAccountSelect(accountidParam: number)
  {
    // console.log(accountidParam);
    if (accountidParam==0)
    {
      this.integratorsFiltered = this.integrators;
    }
    else
    {
      this.integratorsFiltered = this.integrators.filter((obj) => {
         return obj.accountid == accountidParam;
      })

    }


  }

  isAdminUser(): Boolean {
    return (this.currentUser.usertype == 5);
  }
  
  AccountName(accountid: number) {
    let name = "";
    this.accounts.forEach(element => {
      if (element.accountid == accountid) {
        name = element.companyname;
      }

    });

    return name;
  }

  integratorRoute(integratorid: number, route: string) {
    this.router.navigate(['/integrator', integratorid], { queryParams: { returnUrl: route } });
  }

  delete(integrator: iIntegrator) {
    this.confirmDelete.displayDeleteConfirmationMessege()
       .subscribe(dialogResult => {
        if (dialogResult) {
          this.service.delete(integrator.integratorid)
            .subscribe(response => {
              let index = this.integrators.indexOf(integrator);
              this.integrators.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }


}
