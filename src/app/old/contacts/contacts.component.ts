import { iContact } from './iContact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: iContact[];

  constructor(private service: ContactService, public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.contacts = <iContact[]>response;
    //      console.log(response);
          
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }


  deleteContact(contact: iContact) {

    this.confirmDelete.displayDeleteConfirmationMessege()
      //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(contact.integratorid)
            .subscribe(response => {
              let index = this.contacts.indexOf(contact);
              this.contacts.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

  

}
