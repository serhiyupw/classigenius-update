import { ClientService } from './../_services/client.service';
import { Component, OnInit } from '@angular/core';
import { iClient } from './iClients';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  clients: iClient[];

  constructor(private service: ClientService, public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.clients = <iClient[]>response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }


  deleteClient(client: iClient) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(client.integratorid)
            .subscribe(response => {
              let index = this.clients.indexOf(client);
              this.clients.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }


}
