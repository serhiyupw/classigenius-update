import { IntegratorService } from 'src/app/_services/integrator.service';
import { SolutionService } from './../../_services/solution.service';
import { iSolution } from './../solution';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iUser } from 'src/app/users/iUser';
import { AccountService } from 'src/app/_services/account.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LicenseService } from 'src/app/_services/license.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'solution-form',
  templateUrl: './solution-form.component.html',
  styleUrls: ['./solution-form.component.scss']
})
export class SolutionFormComponent implements OnInit {

  constructor(
    private service: SolutionService,
    private authenticationService: AuthenticationService,
    private licenseService: LicenseService,
    private accountService: AccountService,
    private integratorService : IntegratorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: iUser;
  buttonText: string;
  solution: Partial<iSolution> = {};

  returnUrl: string;

  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {

      key: 'accountid',
      type: 'select',
      templateOptions: {
        label: 'Account',
        placeholder: '------------',
        required: true,
        options: this.accountService.getLookup(),
        valueProp: 'accountid',
        labelProp: 'companyname',
        readonly: true,
      },
    },
    {

      key: 'integratorid',
      type: 'select',
      templateOptions: {
        label: 'Integrator',
        placeholder: '------------',
        required: true,
        options: this.integratorService.getLookup(),
        valueProp: 'integratorid',
        labelProp: 'companyname',
        readonly: true,
      },
    },
    {
      key: 'name',
      type: 'input',

      templateOptions: {
        type: 'text',

        label: 'Name',
        required : true,
        minLength: 3,
      },

    },
    {
      key: 'comments',
      type: 'input',

      templateOptions: {
        type: 'text',

        label: 'Comments',
        required: false,
        minLength: 3,
      },

    },
    {
      key: 'publicsolution',
      type: 'select',

      templateOptions: {
        label: 'Private/Public',
        placeholder: '------------',
        required: true,

        options: [
          {
            value: "0",
            label: 'private'
          },
          {
            value: "1",
            label: 'public - payment'
          },
          {
            value: "2",
            label: 'public - free'
          },
        ],
      },
    },
   
  
    {
      key: 'evaluationperiod',
      type: 'input',

      templateOptions: {
        type: 'number',

        label: 'Trial Period',

      },
    },
    {
      key: 'setuplicense',
      type: 'select',
   
      templateOptions: {
        label: 'License',
        placeholder: '------------',
        disabled : true,
        options: this.licenseService.getLookup(),
        valueProp: 'licenseid',
        labelProp: 'licensekey',
      },
    },
    {
      key: 'solutionkey',
      type: 'input',

      templateOptions: {
        type: 'text',
        readonly: true,
        disabled : true,
        label: 'Solution Key',
      },
    },

    // {
    //   key: 'lastversionindex',
    //   type: 'input',

    //   templateOptions: {
    //     type: 'number',

    //     label: 'Last Version',

    //   },
    // },
    {
      template: '<br/ >',
    },
    {
      key: 'active',
      type: 'checkbox',
      templateOptions: {
        label: 'Active',
      }
    },
  ]


  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let solutionid = this.route.snapshot.paramMap.get('id');


    if (solutionid == '0') {
      this.router.navigate([this.returnUrl]);

    }
    else {    // update old record
      this.buttonText = "Update";

      this.service.get(solutionid)
        .subscribe(
          response => {
            this.solution = <iSolution>response;
            // if (this.currentUser.accountid > 0) {
            //   this.project.accountid = this.currentUser.accountid;
            // }
           // console.log(this.solution);
            if (this.solution.solutionid == null) {
              this.router.navigate(['/home']);
            }

          },
          _error => {
            console.log('error');
          })
    }

  }

  submit() {
 //   console.log(this.solution);
    this.service.update(this.solution)
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

  cancelRoute() {
    this.router.navigate([this.returnUrl]);
  }
}
