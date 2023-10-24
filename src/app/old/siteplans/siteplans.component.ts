import { iSiteplan } from './iSiteplan';
import { Component, OnInit } from '@angular/core';
import { SiteplanService } from '../_services/siteplan.service';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'siteplans',
  templateUrl: './siteplans.component.html',
  styleUrls: ['./siteplans.component.css']
})
export class SiteplansComponent implements OnInit {

  siteplans: iSiteplan[];

  constructor(private service: SiteplanService, public confirmDelete: ConfirmDeleteComponent) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.siteplans = <iSiteplan[]>response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  deleteSiteplan(siteplan: iSiteplan) {

    this.confirmDelete.displayDeleteConfirmationMessege()
  
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(siteplan.siteplanid)
            .subscribe(response => {
              let index = this.siteplans.indexOf(siteplan);
              this.siteplans.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }


}
