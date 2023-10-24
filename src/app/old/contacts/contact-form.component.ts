import { ClientService } from '../_services/client.service';
import { ContactService } from '../_services/contact.service';
import { iClient } from './../clients/iClients';
import { iIntegrator } from '../integrators/iIntegrator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iContact } from './iContact';

import { IntegratorService } from '../_services/integrator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {


  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    clientid: new FormControl('', [Validators.required]),
    integratorid: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    phone: new FormControl(''),
    mobilephone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    preferemail: new FormControl(''),
   
    fixedMonthlycharge: new FormControl(''),
    minmonthlycharge: new FormControl('')

  });

  contact: iContact;
  buttonText: string;
  confirmDelete: any;

  integrators: iIntegrator[];
  clients: iClient[];

  constructor(private service: ContactService,
    private integratorService: IntegratorService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let contactid = this.route.snapshot.paramMap.get('id');

    if (contactid == '0') {   // new record

      this.contact = {
        contactid: 0,
        name: "",
        clientid: 0,
        integratorid: 0,
        phone: "",
        mobilephone: "",
        email: "",
        preferemail: false,
        country: "",
        fixedMonthlycharge: 0,
        minmonthlycharge: 0
      } as iContact;
      this.buttonText = "Create";

    }
    else {    // update old client
      this.buttonText = "Update";
      console.log("init " + this.contact);
      this.service.get(contactid)
        .subscribe(
          response => {
            this.contact = <iContact>response;
           

            this.form.patchValue({
              name: this.contact.name,
              clientid: this.contact.clientid,
              integratorid: this.contact.integratorid,
              phone: this.contact.phone,
              mobilephone: this.contact.mobilephone,
              email: this.contact.email,
              preferemail: this.contact.preferemail,
              country: this.contact.country,
              fixedMonthlycharge: this.contact.fixedMonthlycharge,
              minmonthlycharge: this.contact.minmonthlycharge

            })
             console.log(this.form);
          },
          _error => {
            console.log('error');
          })
    }

    this.integratorService.getAll()
      .subscribe(
        response => {
          this.integrators = <iIntegrator[]>response;
          console.log(this.integrators);
        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.clientService.getAll()
      .subscribe(
        response => {
          this.clients = <iClient[]>response;
          console.log(this.clients);
        },
        error => {
          alert('Error');
          console.log('error');
        })

  }

  get name() {
    return this.form.get('name');
  }
  get clientid() {
    return this.form.get('clientid');
  }
  get integratorid() {
    return this.form.get('integratorid');
  }

  get phone() {
    return this.form.get('phone');
  }

  get mobilephone() {
    return this.form.get('mobilephone');
  }
  get email() {
    return this.form.get('email');
  }
  get preferemail() {
    return this.form.get('preferemail');
  }
  get country() {
    return this.form.get('country');
  }
  get fixedMonthlycharge() {
    return this.form.get('fixedMonthlycharge');
  }

  get minmonthlycharge() {
    return this.form.get('minmonthlycharge');
  }

  submit() {

    this.contact.name = this.form.value.name;
    this.contact.clientid = this.form.value.clientid;
    this.contact.integratorid = this.form.value.integratorid;
    this.contact.clientid = this.form.value.clientid;
    this.contact.integratorid = this.form.value.integratorid;
    this.contact.phone = this.form.value.phone;
    this.contact.mobilephone = this.form.value.mobilephone;
    this.contact.email = this.form.value.email;
    this.contact.preferemail = this.form.value.preferemail;
    this.contact.country = this.form.value.country;
    this.contact.fixedMonthlycharge = this.form.value.fixedMonthlycharge;
    this.contact.minmonthlycharge = this.form.value.minmonthlycharge;

    if (this.contact.contactid == 0) {
      this.service.create(this.contact)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/contacts']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {
      this.service.update(this.contact)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/contacts']);
        })
      _error => {
        console.log('error');
      }
    }
  }

}
