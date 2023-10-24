import { PlanService } from './../../_services/plan.service';
import { Component, OnInit } from '@angular/core';
import { iPlan } from 'src/app/old/plans/iPlan';
import { iUser } from 'src/app/users/iUser';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { userTypes } from 'src/app/_common/constants';

@Component({
  selector: 'plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {



  constructor(
    private service: PlanService,
    private confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }


  currentUser: iUser;
  plans: iPlan[];

  ngOnInit(): void {

    if (!this.isAccountUser()) {
      this.router.navigate(['/']);
    }
    this.service.getAll()
      .subscribe(
        response => {
          this.plans = <iPlan[]>response;
          // this.FilterRecords();
        },
        error => {
          alert('Error');
          console.log('error');
        })

  }

  planRoute(planid: number, route: string) {
    this.router.navigate(['/plan', planid], { queryParams: { returnUrl: route } });
  }


  delete(plan: iPlan) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {
        if (dialogResult) {
          this.service.delete(plan.planid)
            .subscribe(response => {
              let index = this.plans.indexOf(plan);
              this.plans.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

  isAccountUser(): boolean {
    return (this.currentUser.usertype == userTypes.AccountUser || this.currentUser.usertype == userTypes.AccountManager || this.currentUser.usertype == userTypes.Admin);
  
  }



}
