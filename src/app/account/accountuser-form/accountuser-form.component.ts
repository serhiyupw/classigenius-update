import { IntegratorService } from 'src/app/_services/integrator.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AccountService } from 'src/app/_services/account.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { iUser } from 'src/app/users/iUser';
import { iAccount } from '../iAccount';
import { iIntegrator } from 'src/app/integrators/iIntegrator';

@Component({
  selector: 'app-accountuser-form',
  templateUrl: './accountuser-form.component.html',
  styleUrls: ['./accountuser-form.component.scss']
})
export class AccountuserFormComponent implements OnInit {

  constructor
    (
      private authenticationService: AuthenticationService,
      private accountService: AccountService,
      private userService: UserService,
      private IntegratorService: IntegratorService,
      // private route: ActivatedRoute,
      private router: Router,
    ) { }

  form = new FormGroup({})
  currentUser: iUser;
  user: iUser;
  account: iAccount;
  integrator: iIntegrator;

  fields: FormlyFieldConfig[];

  model =
    {
      companyname: '',
      email: '',
      integratorkey: 0,
      website: '',

      contactname: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',


    }

  loadForms(): FormlyFieldConfig[] {
    return [
      {
        template: '<p><b><u>Basic Information</b></u></p><br/ >',
      },
      {
        fieldGroupClassName: 'row',
        // fieldGroupClassName: 'display-flex',
        fieldGroup: [

          {
            key: 'companyname',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',

              label: 'Company Name',
              // required: true,
              minLength: 3,
            },
          },
          {
            key: 'website',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',
              label: 'Website',
            },
          },
        ],
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'email',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',
              label: 'Email',
              // required: true,
              readonly: true,
              // minLength: 3,
            },
          },
          {
            key: 'integratorkey',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',

              label: 'Integrator Key',

              readonly: true,

            },

          },
        ],
      },
      {
        template: '<br/><br/><p><b><u>Contact Information</b></u></p><br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'contactname',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',

              label: 'Contact Name',
              required: true,
              minLength: 3,
            },
          },
          {
            key: 'email',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',
              label: 'Email',
              readonly: true,
            },
          },
        ],
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'address',
            type: 'input',
            className: 'col-9',
            templateOptions: {
              type: 'text',

              label: 'Address',

              minLength: 3,
            },
          },

        ],
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'city',
            type: 'input',
            className: 'col-4',
            templateOptions: {
              type: 'text',

              label: 'City',

              minLength: 3,
            },
          },
          {
            key: 'state',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'text',
              label: 'State',
            },
          },
          {
            key: 'zip',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'text',
              label: 'Zip',
            },
          },
        ],
      },

    ]

  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;


    this.userService.get(this.currentUser.userid)
      .subscribe(
        response => {
          this.user = <iUser>response;

          this.model.email = this.user.email;
          this.model.contactname = this.user.fullname;


          // get account record
          this.accountService.get(this.user.accountid).subscribe(
            response => {

              this.account = <iAccount>response;
              this.model.companyname = this.account.companyname;
              this.model.website = this.account.website;
              this.model.phone = this.account.phone;
              this.model.address = this.account.address;
              this.model.city = this.account.city;
              this.model.state = this.account.state;
              this.model.zip = this.account.zip;

              // get integrator record
              this.IntegratorService.get(this.currentUser.integratorid).subscribe(
                response => {
                  this.integrator = <iIntegrator>response;
                  this.model.integratorkey = this.integrator.integratorkey;

                  this.fields = this.loadForms();
                },
                (err) => console.log(err)
              );

            },
            (err) => console.log(err)
          
          );
        },
        (err) => console.log(err)
      );


  }

  cancelRoute() {
    this.router.navigate(['/home']);
  }


  submit() {


    this.account.companyname = this.model.companyname;
    this.account.website = this.model.website;
    this.account.phone = this.model.phone;
    this.account.address = this.model.address;
    this.account.city = this.model.city;
    this.account.state = this.model.state;
    this.account.zip = this.model.zip;

    // console.log(this.model);
    // console.log(this.currentUser);
    console.log(this.account);
    // console.log(this.integrator);

    this.accountService.update(this.account).subscribe(
      response => {
        console.log(response);

      },
      (err) => console.log(err)
    );


    this.user.fullname = this.model.contactname;
    if (this.model.email != this.user.email) {
      this.user.newemail = this.model.email;    // set new email address

    }
    this.userService.update(this.user).subscribe(
      response => {
        console.log(response);

      },
      (err) => console.log(err)
    );


    this.router.navigate(['/home']);
  }

}
