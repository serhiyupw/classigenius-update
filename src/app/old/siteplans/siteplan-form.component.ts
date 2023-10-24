import { FsesiteService } from './../_services/fsesite.service';
import { SiteplanService } from './../_services/siteplan.service';
import { iSiteplan } from './iSiteplan';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iFsesite } from '../fsesites/iFsesite';

@Component({
  selector: 'app-siteplan-form',
  templateUrl: './siteplan-form.component.html',
  styleUrls: ['./siteplan-form.component.css']
})
export class SiteplanFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, ]),
    siteid: new FormControl('', [ Validators.required, ]),
    planid: new FormControl('', [Validators.required, ])
  
  });

  siteplan: iSiteplan;
  buttonText: string;
  confirmDelete: any;

  fsesites: iFsesite[];


  constructor(private service: SiteplanService, private fsesiteService: FsesiteService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let siteplanid = this.route.snapshot.paramMap.get('siteplanid');

    if (siteplanid == '0') {   // new record

      this.siteplan = {
        siteplanid: 0,
        name: "",
        siteid: 0,
        planid : 0
      } as iSiteplan;
      this.buttonText = "Create";
      //console.log(this.siteplan);
    }
    else {    // update old siteplan
      this.buttonText = "Update";
      this.service.get(siteplanid)
        .subscribe(
          response => {
            this.siteplan = <iSiteplan> response;
            //console.log(this.siteplan);

            this.form.patchValue({
              name: this.siteplan.name,
              siteid: this.siteplan.siteid,
              planid: this.siteplan.planid
             
            })
          },
          _error => {
            console.log('error');
          })
    }

  //  console.log("before query");
    this.fsesiteService.getAll()
    .subscribe(
      response => {
        this.fsesites = <iFsesite[]> response;
        console.log(this.fsesites);  
      },
      error => {
        alert('Error');
        console.log('error');
      })
    


  }

  get name() {
    return this.form.get('name');
  }

  get planid() {
    return this.form.get('planid');
  }
  get siteid() {
    return this.form.get('siteid');
  }


  submit() {

    this.siteplan.name = this.form.value.name;
    this.siteplan.siteid = this.form.value.siteid;
    this.siteplan.planid = this.form.value.planid;
   
    if (this.siteplan.siteplanid == 0) {
      this.service.create(this.siteplan)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/siteplans']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid : true
        });
      }
    }
    else {
      this.service.update(this.siteplan)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/siteplans']);
        })
      _error => {
        console.log('error');
      }
    }
  }


 

}
