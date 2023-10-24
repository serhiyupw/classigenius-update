import { Component, OnInit } from '@angular/core';
import { iGlobals } from '../globals';
import { iUser } from 'src/app/users/iUser';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Router } from '@angular/router';
import { userTypes } from 'src/app/_common/constants';
import { AuthenticationService } from 'src/app/_services/authentication.service';

type NewType = FormlyFieldConfig;

@Component({
  selector: 'app-globals-form',
  templateUrl: './globals-form.component.html',
  styleUrls: ['./globals-form.component.scss']
})
export class GlobalsFormComponent implements OnInit {

  constructor(
    private router: Router,
    private service: GlobalsService , 
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     
    }
  

  globals: iGlobals;
  currentUser: iUser;
  form = new FormGroup({})
  fields: FormlyFieldConfig[];

  loadForms(): NewType[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'activationgraceperiod',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Activation Grace Period (Months)',
              required: true,
            }
          }
        ]
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'discount2years',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Discount 2 Years (%)',
              required: true,
            }
          },
          {
            key: 'discount3years',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Discount 3 Years (%)',
              required: true,
            }
          },
          {
            key: 'discount4years',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Discount 4 Years (%)',
              required: true,
            }
          },
          {
            key: 'discount5years',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Discount 5 Years (%)',
              required: true,
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'extendyearsgraceperiod',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Extend Years Grace Period (Months)',
              required: true,
            }
          }
        ]
      },

    ]
  }


  ngOnInit(): void {

    if (!this.isAdminuser()) {
      this.router.navigate(['/']);
    }

    this.service.get(1)
    .subscribe(
      response => {
        this.globals = <iGlobals>response;

         console.log(this.globals);
 
        if (this.globals.activationgraceperiod==null)
        {
          this.router.navigate(['/home']);
        }
        this.fields =  this.loadForms();
      },
      _error => {
        console.log('error');
      })

   
  }


  submit() {

    this.service.update(this.globals)
    .subscribe(response => {
   //   this.router.navigate([this.returnUrl]);
      this.router.navigate(['/home']);
    })
  _error => {
    console.log('error');
    this.form.setErrors({
      invalid: true
    });
  };
  }

  isAdminuser() {
    return this.currentUser.usertype == userTypes.Admin;
    
  }

}
