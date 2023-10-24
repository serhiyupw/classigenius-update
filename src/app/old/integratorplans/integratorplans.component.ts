import { IntegratorPlanService } from './../_services/integrationplan.service';
import { iIntegratorplan } from './iIntegratorplan';
import { Component, OnInit } from '@angular/core';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'integratorplans',
  templateUrl: './integratorplans.component.html',
  styleUrls: ['./integratorplans.component.scss']
})
export class IntegratorplansComponent implements OnInit {

  integratorplans: iIntegratorplan[];
  constructor(private service: IntegratorPlanService, public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.integratorplans = <iIntegratorplan[]>response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  delete(integratorplan: iIntegratorplan) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(integratorplan)
            .subscribe(response => {
              let index = this.integratorplans.indexOf(integratorplan);
              this.integratorplans.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }


}
