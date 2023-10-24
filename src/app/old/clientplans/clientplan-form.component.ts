import { iPlan } from './../plans/iPlan';
import { PlanService } from './../_services/plan.service';
import { PlansFormComponent } from './../plans/plans-form.component';

import { ClientService } from './../_services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientplanService } from '../_services/clientplan.service';
import { iClient } from '../clients/iClients';
import { ActivatedRoute, Router } from '@angular/router';
import { iClientplan } from './iClientplan';


@Component({
  selector: 'clientplan-form',
  templateUrl: './clientplan-form.component.html',
  styleUrls: ['./clientplan-form.component.scss']
})
export class ClientplanFormComponent implements OnInit {

  form = new FormGroup({
    clientid: new FormControl('', [Validators.required]),
    planid: new FormControl('', [Validators.required]),

  })

  clientplan: iClientplan;
  buttonText: string;
  confirmDelete: any;


  clients: iClient[];
  plans: iPlan[];

  constructor(private service: ClientplanService,
    private clientService: ClientService,
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    let clientplanid = this.route.snapshot.paramMap.get('id');

    console.log(clientplanid);
    if (clientplanid == '0') {   // new record
      this.clientplan = {
        clientplanid: 0,
        clientid: 0,
        planid: 0
      } as iClientplan;
      this.buttonText = "Create";

    }
    else {    // update old client
      this.buttonText = "Update";
      //  console.log("init "+this.client);
      this.service.get(clientplanid)
        .subscribe(
          response => {
            this.clientplan = <iClientplan>response;
            //console.log(this.client);

            this.form.patchValue({

              clientid: this.clientplan.clientid,
              planid: this.clientplan.planid

            })
          },
          _error => {
            console.log('error');
          })
    }


    this.clientService.getAll()
      .subscribe(
        response => {
          this.clients = <iClient[]>response;

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

  get clientid() {
    return this.form.get('clientid');
  }
  get planid() {
    return this.form.get('planid');
  }

  submit() {

    this.clientplan.clientid = this.form.value.clientid;
    this.clientplan.planid = this.form.value.planid;


    if (this.clientplan.clientplanid == 0) {
      this.service.create(this.clientplan)
        .subscribe(response => {

          this.router.navigate(['/clientplans']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {
      console.log(this.clientplan);
      this.service.update(this.clientplan)
        .subscribe(response => {

          this.router.navigate(['/clientplans']);
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
