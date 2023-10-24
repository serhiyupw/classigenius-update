
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { iAccount } from '../account/iAccount';
import { iUser } from '../users/iUser';
import { AccountService } from '../_services/account.service';
import { AuthenticationService } from '../_services/authentication.service';
import { IntegratorService } from '../_services/integrator.service';
import { iIntegrator } from './iIntegrator';

@Component({
  selector: 'app-integrator-form',
  templateUrl: './integrator-form.component.html',
  styleUrls: ['./integrator-form.component.scss']
})
export class IntegratorFormComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private service: IntegratorService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,

  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  currentUser: iUser;
  integrator: iIntegrator;
  buttonText: string;
  returnUrl: string;
  accountHidden: boolean;
  accounts: iAccount[];



  form = new FormGroup({})
  fields: FormlyFieldConfig[] ;


 loadForms(): FormlyFieldConfig[] {
    return [
    {   
   
    
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'accountid',
          type: 'select',
          className: 'col-3',
          templateOptions: {
            label: 'account',
            placeholder: '------------',
            required: true,
            options: this.accountService.getLookup(),
            valueProp: 'accountid',
            labelProp: 'companyname',
          },
          hideExpression: hidden => !this.isAdminUser(),
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'companyname',
          type: 'input',
          className: 'col-3',
          templateOptions: {
            type: 'text',

            label: 'Company Name',
            required: true,
            minLength: 3,
          },

        },
        {
          key: 'contactname',
          type: 'input',
          className: 'col-3',
          templateOptions: {
            type: 'text',

            label: 'Contact Name',
            required: true,
            minLength: 3,

          },
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup:
        [
          {
            key: 'phone',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'text',
              label: 'Phone',
              minLength: 7,
            },
          },
        ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup:
        [
          {
            key: 'address',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'text',
              label: 'Address',
              className: 'flex-3',
            },
          },
          {
            key: 'city',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'text',
              label: 'City',
            },
          },
          {
            key: 'state',
            type: 'input',
            className: 'col-3',
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
        ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup:
        [
          {
            key: 'country',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'text',
              label: 'Country',
            },
          },
        ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup:
        [
          {
            key: 'website',
            type: 'input',
            className: 'col-5',
            templateOptions: {
              type: 'text',
              label: 'Web Site',
            },
          },
          {
            key: 'integratorkey',
            type: 'input',
            templateOptions: {
      
              readonly: true,
              label: 'Integrator Key'
            }
          }
        ]

    
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup:
        [
          {
            key: 'maxsolutionfilessize',
            type: 'input',
            className: 'col-5',
            templateOptions: {
              type: 'number',
              label: 'max solution files size (MB)',
            },
            expressionProperties: {

              'templateOptions.disabled': readOnly =>!this.isAccountAdminorAdmin(),
            },
          },
       
        ]

    },
  ]
}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
    let integratorid = this.route.snapshot.paramMap.get('id');

    this.fields = this.loadForms();

    if (integratorid == '0') {   // new record

      this.buttonText = "Create";
      this.integrator = {
        integratorid: 0,
        companyname: "",
        contactname: ""

      } as iIntegrator;

    }
    else {    // update old record
      this.buttonText = "Update";

      this.service.get(integratorid)
        .subscribe(
          response => {
            this.integrator = <iIntegrator>response;
     
            if (this.integrator.integratorid==null)
            {
              this.router.navigate(['/home']);
            }
          },
          _error => {
            console.log('error');
          })
    }

  }

  isAdminUser(): Boolean {
    //  console.log(this.currentUser.usertype);
      return (this.currentUser.usertype == 5);
    }

  isAccountAdminorAdmin(): boolean {
      return ( (this.currentUser.usertype == 2) || (this.isAdminUser()==true));
    }
  

  submit() {
    // this.integrator.companyname = this.form.value.companyname;
    // this.integrator.contactname = this.form.value.contactname;

    console.log(this.integrator);

    if (this.integrator.integratorid == 0) {
      this.service.create(this.integrator)
        .subscribe(response => {

       //   this.router.navigate(['/integrators']);
          this.router.navigate([this.returnUrl]);
       
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {
    }
    this.service.update(this.integrator)
      .subscribe(response => {
        this.router.navigate([this.returnUrl]);
     //   this.router.navigate(['/integrators']);
      })
    _error => {
      console.log('error');
      this.form.setErrors({
        invalid: true
      });
    };

  }

  cancelRoute()
  {
    this.router.navigate([this.returnUrl]);
  }


  get companyname() {
    return this.form.get('companyname');
  }
  get contactname() {
    return this.form.get('contactname');
  }
}
