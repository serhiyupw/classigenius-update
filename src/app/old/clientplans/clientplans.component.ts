
import { Component, OnInit } from '@angular/core';
import { ClientplanService } from '../_services/clientplan.service';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';
import { iClientplan } from './iClientplan';

@Component({
  selector: 'clientplans',
  templateUrl: './clientplans.component.html',
  styleUrls: ['./clientplans.component.scss']
})
export class ClientplansComponent implements OnInit {

  clientplans: iClientplan[];
  constructor(private service: ClientplanService, public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.clientplans = <iClientplan[]>response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  delete(clientplan: iClientplan) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(clientplan)
            .subscribe(response => {
              let index = this.clientplans.indexOf(clientplan);
              this.clientplans.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

}
