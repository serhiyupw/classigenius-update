// import { CompileShallowModuleMetadata } from '@angular/compiler';
import { AccountService } from './../_services/account.service';
import { iUser } from './../users/iUser';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { iAccount } from './iAccount';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core'



@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, AfterViewChecked {

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  // form = new FormGroup({
  //   companyname: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   contactname: new FormControl('', ),

  // });

  MaxSizeReadOnly: boolean;
  account: iAccount;
  currentUser: iUser;
  returnUrl: string;

  form = new FormGroup({})

  fields: FormlyFieldConfig[];

  loadForms(): FormlyFieldConfig[] {
    return [
      {

        fieldGroupClassName: 'display-flex',
        hooks: {
          onChanges: () => {
            if (!this.isAccountAdmin()) {
              this.form.disable();
            }

          }
        },
        fieldGroup: [
          {
            key: 'companyname',
            type: 'input',
           // className: 'col-3',
            className: 'flex-1 col-3',
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
          //   className: 'col-3',
           className: 'flex-1 col-3',
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
              className: 'flex-1 col-3',
              templateOptions: {
                type: 'text',
                label: 'Address',
                className: 'flex-3',
              },
            },
            {
              key: 'city',
              type: 'input',
              className: 'flex-1 col-3',
              templateOptions: {
                type: 'text',
                label: 'City',
              },
            },
            {
              key: 'state',
              type: 'input',
              className: 'flex-1 col-1',
              templateOptions: {
                type: 'text',
                label: 'State',
              },
            },
            {
              key: 'zip',
              type: 'input',
              className: 'flex-1 col-2',
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

                'templateOptions.disabled': readOnly => !this.isAdmin(),
              },
            },

          ]

      },

    ]
  };



  buttonText: string;

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
    let accountid = this.route.snapshot.paramMap.get('id');

    this.currentUser = this.authenticationService.currentUserValue;

    this.fields = this.loadForms();
    //  console.log(currentUser);

    if (accountid == '0') {
      this.buttonText = "Create";
      this.account = {
        accountid: 0,
      } as iAccount;
    }

    else {
      this.accountService.get(accountid)
        //  this.accountService.get(this.currentUser.accountid)
        .subscribe(
          response => {
            this.account = <iAccount>response;
          },
          _error => {
            console.log('error');
          })
      this.buttonText = "Update";

    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  isAccountAdmin(): boolean {

    if (this.currentUser.usertype == 2 || this.currentUser.usertype == 5) {
      return true;
    }
    else {
      return false;
    }
  }

  isAdmin(): boolean {

    return (this.currentUser.usertype == 5);

  }


  cancelRoute() {
    this.router.navigate([this.returnUrl]);
  }


  submit() {
    //   console.log(this.account);

    if (this.account.accountid == 0) {
      this.accountService.create(this.account)
      .subscribe(response => {
          
          this.router.navigate([this.returnUrl]);
        })
    }
    else {
      this.accountService.update(this.account)
        .subscribe(response => {

          this.router.navigate([this.returnUrl]);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      };

    }
  }
}
