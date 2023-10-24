import { FsesystemService } from './../_services/fsesystem.service';
import { iFsesystem } from './iFsesystem';
import { Component, OnInit } from '@angular/core';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'fsesystems',
  templateUrl: './fsesystems.component.html',
  styleUrls: ['./fsesystems.component.scss']
})
export class FsesystemsComponent implements OnInit {
 
  fsesystems: iFsesystem[];

  constructor(private service: FsesystemService,  public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.fsesystems = <iFsesystem[]> response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  delete(fsesystem: iFsesystem) {

    this.confirmDelete.displayDeleteConfirmationMessege()
  //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(fsesystem.fsesystemid)
            .subscribe(response => {
              let index = this.fsesystems.indexOf(fsesystem);
              this.fsesystems.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
             })
        }
      });
  }

}
