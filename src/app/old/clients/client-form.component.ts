import { iSegment } from './../segments/iSegment';
import { SegmentService } from './../_services/segment.service';
import { iIntegrator } from './../integrators/iIntegrator';
import { ClientService } from './../_services/client.service';
import { iClient } from './iClients';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegratorService } from './../_services/integrator.service';


@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    integratorid: new FormControl('', [Validators.required]),
    segmentid: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    vatnumber: new FormControl('', [Validators.required,]),
    clienttype: new FormControl('', [Validators.required]),
    cpacode: new FormControl(''),
    billinginfo: new FormControl('')

  });

  client: iClient;
  buttonText: string;
  confirmDelete: any;

  integrators: iIntegrator[];
  segments: iSegment[];

  clienttypes = [
    { id: 1, name: 'CPA' },
    { id: 2, name: 'Company' },
    { id: 3, name: 'Accounting software developer' },
  ];

  constructor(private service: ClientService,
    private integratorService: IntegratorService,
    private segmentService: SegmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let clientid = this.route.snapshot.paramMap.get('id');

    if (clientid == '0') {   // new record

      this.client = {
        clientid: 0,
        name: "",
        integratorid: 0,
        segmentid: 0,
        country: "",
        vatnumber: "",
        clienttype: 0,
        cpacode: 0,
        billinginfo: 0

      } as iClient;
      this.buttonText = "Create";
      //console.log(this.client);
    }
    else {    // update old client
      this.buttonText = "Update";
      //  console.log("init "+this.client);
      this.service.get(clientid)
        .subscribe(
          response => {
            this.client = <iClient>response;
            //console.log(this.client);

            this.form.patchValue({
              name: this.client.name,
              integratorid: this.client.integratorid,
              segmentid: this.client.segmentid,
              country: this.client.country,
              vatnumber: this.client.vatnumber,
              clienttype: this.client.clienttype,
              cpacode: this.client.cpacode,
              billinginfo: this.client.billinginfo
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
          //      console.log(this.integrators);  
        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.segmentService.getAll()
      .subscribe(
        response => {
          this.segments = <iSegment[]>response;
          //      console.log( this.segments);  
        },
        error => {
          alert('Error');
          console.log('error');
        })

  }

  get name() {
    return this.form.get('name');
  }
  get integratorid() {
    return this.form.get('integratorid');
  }
  get segmentid() {
    return this.form.get('segmentid');
  }
  get country() {
    return this.form.get('country');
  }
  get vatnumber() {
    return this.form.get('vatnumber');
  }
  get clienttype() {
    return this.form.get('clienttype');
  }
  get cpacode() {
    return this.form.get('cpacode');
  }
  get billinginfo() {
    return this.form.get('billinginfo');
  }
  submit() {

    this.client.name = this.form.value.name;
    this.client.country = this.form.value.country;
    this.client.vatnumber = this.form.value.vatnumber;
    this.client.integratorid = this.form.value.integratorid;
    this.client.segmentid = this.form.value.segmentid;
    this.client.clienttype = this.form.value.clienttype;
    this.client.cpacode = this.form.value.cpacode;
    this.client.billinginfo = this.form.value.billinginfo;

    if (this.client.clientid == 0) {
      this.service.create(this.client)
        .subscribe(response => {
          //        console.log(response);
          this.router.navigate(['/clients']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {
      console.log(this.client);
      this.service.update(this.client)
        .subscribe(response => {
          //         console.log(response);
          this.router.navigate(['/clients']);
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
