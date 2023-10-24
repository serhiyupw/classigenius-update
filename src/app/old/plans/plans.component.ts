import { iPlan } from './iPlan';
import { Component, OnInit } from '@angular/core';
import { PlanService } from '../_services/plan.service';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {


  plans: iPlan[];

  constructor(private service: PlanService, public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.plans = <iPlan[]>response;
          console.log(this.plans);
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }


  deleteplan(plan: iPlan) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      //  this.displayDeleteConfirmationMessege()
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

}
