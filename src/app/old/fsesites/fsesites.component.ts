import { Component, OnInit } from '@angular/core';
import { FsesiteService } from './../_services/fsesite.service';
import { iFsesite } from './iFsesite';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';


@Component({
  selector: 'fsesites',
  templateUrl: './fsesites.component.html',
  styleUrls: ['./fsesites.component.css']
})
export class FsesitesComponent implements OnInit {

  fsesites: iFsesite[];

  constructor(private service: FsesiteService,  public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.fsesites = <iFsesite[]> response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  deleteFsesite(fsesite: iFsesite) {

    this.confirmDelete.displayDeleteConfirmationMessege()
  //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(fsesite.siteid)
            .subscribe(response => {
              let index = this.fsesites.indexOf(fsesite);
              this.fsesites.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

}





