import { Component, OnInit } from '@angular/core';
import { DefaultplantypeService } from 'src/app/_services/defaultplantype.service';
import { iDefaultPlanType } from '../defaulrplantype';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defaultplantypes',
  templateUrl: './defaultplantypes.component.html',
  styleUrls: ['./defaultplantypes.component.scss']
})
export class DefaultplantypesComponent implements OnInit {

  constructor(
    private service: DefaultplantypeService,
    private confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  defaultplantypes : iDefaultPlanType[];

  ngOnInit(): void {

    this.service.getAll()
    .subscribe(
      response => {
        this.defaultplantypes = <iDefaultPlanType[]>response;
       
      },
      error => {
        alert('Error');
        console.log('error');
      })

  }

  planRoute(defaultplantypeid: number, route: string) {
    console.log(defaultplantypeid);
    console.log(route);
    this.router.navigate(['/defaultplantype', defaultplantypeid], { queryParams: { returnUrl: route } });
 }

 delete(defaultplantype: iDefaultPlanType) {
  this.confirmDelete.displayDeleteConfirmationMessege()
     .subscribe(dialogResult => {
      if (dialogResult) {
        this.service.delete(defaultplantype.defaultplantypeid)
          .subscribe(response => {
            let index = this.defaultplantypes.indexOf(defaultplantype);
            this.defaultplantypes.splice(index, 1);
          },
            error => {
              alert('Error');
              console.log('error');
            })
      }
    });
 }

}
