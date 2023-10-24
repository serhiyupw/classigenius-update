import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iIntegratorplan } from './iIntegratorplan';
import { iIntegrator } from '../integrators/iIntegrator';
import { iPlan } from '../plans/iPlan';
import { IntegratorPlanService } from '../_services/integrationplan.service';
import { IntegratorService } from '../_services/integrator.service';
import { PlanService } from '../_services/plan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ingtegrationplan-form',
  templateUrl: './ingtegrationplan-form.component.html',
  styleUrls: ['./ingtegrationplan-form.component.scss']
})
export class IngtegrationplanFormComponent implements OnInit {

  form = new FormGroup({
    integratorid: new FormControl('', [Validators.required]),
    planid: new FormControl('', [Validators.required]),

  })

  integratorplan: iIntegratorplan;
  buttonText: string;
  confirmDelete: any;


  integrators: iIntegrator[];
  plans: iPlan[];

  constructor(private service: IntegratorPlanService,
    private integratorService: IntegratorService,
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    let integratorplanid = this.route.snapshot.paramMap.get('id');

  //  console.log(integratorplanid);
    if (integratorplanid == '0') {   // new record
      this.integratorplan = {
        integratorplanid: 0,
        integratorid: 0,
        planid: 0
      } as iIntegratorplan;
      this.buttonText = "Create";

    }
    else {    // update old integrator
      this.buttonText = "Update";
      //  console.log("init "+this.integrator);
      this.service.get(integratorplanid)
        .subscribe(
          response => {
            this.integratorplan = <iIntegratorplan>response;
            //console.log(this.integrator);

            this.form.patchValue({

              integratorid: this.integratorplan.integratorid,
              planid: this.integratorplan.planid

            })
          },
          _error => {
            console.log('error');
          })
    }


    this.integratorService.getAll()
      .subscribe(
        response => {
          this.integrators = <iIntegrator[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })


    this.planService.getAll()
      .subscribe(
        response => {
          this.plans = <iPlan[]>response;
        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  get integratorid() {
    return this.form.get('integratorid');
  }
  get planid() {
    return this.form.get('planid');
  }

  submit() {

    this.integratorplan.integratorid = this.form.value.integratorid;
    this.integratorplan.planid = this.form.value.planid;


    if (this.integratorplan.integratorplanid == 0) {
      this.service.create(this.integratorplan)
        .subscribe(response => {

          this.router.navigate(['/integratorplans']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {
      console.log(this.integratorplan);
      this.service.update(this.integratorplan)
        .subscribe(response => {

          this.router.navigate(['/integratorplans']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
  }


}
