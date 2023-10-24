import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iPlan } from './iPlan';
import { PlanService } from '../_services/plan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.scss']
})
export class PlansFormComponent implements OnInit {
  form = new FormGroup({
    plandesc: new FormControl('', [Validators.required, Validators.minLength(3)]),
    comments :  new FormControl('',),
    systemid :  new FormControl('',),
    priority :  new FormControl('',),
    recdoccharge : new FormControl('',),
    recpagecharge:  new FormControl('',),
    recnfdoccharge: new FormControl('',),
    recnfpagecharge: new FormControl('',),
    norecpagecharge: new FormControl('',),
    lineitemcharge: new FormControl('',),
    sla1:  new FormControl('',),
    sla2:  new FormControl('',),
    sla2discount  : new FormControl('',),
    archive : new FormControl('',),
    archiveplan :  new FormControl('',)
  
  });

  plan: iPlan;
  buttonText: string;
  confirmDelete: any;

  constructor(private service: PlanService,   private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let planid = this.route.snapshot.paramMap.get('id');

    if (planid == '0') {   // new record

      this.plan = {
        planid: 0,
        plandesc : "",
        comments : "",
        systemid : 0,
        priority : 0,
        recdoccharge : 0,
        recpagecharge: 0,
        recnfdoccharge:0,
        recnfpagecharge:0,
        norecpagecharge:0,
        lineitemcharge:0,
        sla1: "",
        sla2: "",
        sla2discount  :0,
        archive :0,
        archiveplan : 0

      } as iPlan;
      this.buttonText = "Create";
      //console.log(this.plan);
    }
    else {    // update old plan
      this.buttonText = "Update";
      console.log(planid);
      this.service.get(planid)
        .subscribe(
          response => {
            this.plan = <iPlan> response;
            console.log(this.plan);

            this.form.patchValue({

              plandesc : this.plan.plandesc,
              comments : this.plan.comments,
              systemid : this.plan.systemid,
              priority : this.plan.priority,
              recdoccharge : this.plan.recdoccharge,
              recpagecharge: this.plan.recpagecharge,
              recnfdoccharge:this.plan.recnfdoccharge,
              recnfpagecharge:this.plan.recnfpagecharge,
              norecpagecharge:this.plan.norecpagecharge,
              lineitemcharge:this.plan.lineitemcharge,
              sla1: this.plan.sla1,
              sla2: this.plan.sla2,
              sla2discount : this.plan.sla2discount,
              archive :this.plan.archive,
              archiveplan : this.plan.archiveplan
           })
          },
          _error => {
            console.log('error');
          })
    }


    // this.service.getAll()
    // .subscribe(
    //   response => {
    //     this.plan = <iFsesite[]> response;
    //     console.log(this.fsesites);  
    //   },
    //   error => {
    //     alert('Error');
    //     console.log('error');
    //   })
    

  }

  get plandesc() {
    return this.form.get('plandesc');
  }
  get comments() {
    return this.form.get('comments');
  }
  get systemid() {
    return this.form.get('systemid');
  }


  submit() {

    this.plan.plandesc = this.form.value.plandesc;
    this.plan.comments = this.form.value.comments,
    this.plan.systemid = this.form.value.systemid,
    this.plan.priority = this.form.value.priority,
    this.plan.recdoccharge = this.form.value.recdoccharge,
    this.plan.recpagecharge= this.form.value.recpagecharge,
    this.plan.recnfdoccharge=this.form.value.recnfdoccharge,
    this.plan.recnfpagecharge=this.form.value.recnfpagecharge,
    this.plan.norecpagecharge=this.form.value.norecpagecharge,
    this.plan.lineitemcharge=this.form.value.lineitemcharge,
    this.plan.sla1= this.form.value.sla1,
    this.plan.sla2= this.form.value.sla2,
    this.plan.sla2discount = this.form.value.sla2discount,
    this.plan.archive =this.form.value.archive,
    this.plan.archiveplan = this.plan.archiveplan
   
   
    if (this.plan.planid == 0) {
      this.service.create(this.plan)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/plans']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid : true
        });
      }
    }
    else {
      this.service.update(this.plan)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/plans']);
        })
      _error => {
        console.log('error');
      }
    }
  }



}
