import { iProject } from './../../projects/project';
import { iIntegrator } from './../../integrators/iIntegrator';
import { ProjectService } from './../../_services/project.service';
import { IntegratorService } from 'src/app/_services/integrator.service';
import { iAccount } from 'src/app/account/iAccount';
import { AccountService } from 'src/app/_services/account.service';
import { SolutionpermissionService } from './../../_services/solutionpermission.service';
import { iSolutionPermission } from './../solutionpermission';
import { Component, OnInit } from '@angular/core';
import { iUser } from 'src/app/users/iUser';
import { FormGroup } from '@angular/forms';
import { SolutionService } from 'src/app/_services/solution.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { iLicense } from 'src/app/licenses/license';
import { LicenseService } from 'src/app/_services/license.service';

@Component({
  selector: 'app-solutionpermission-form',
  templateUrl: './solutionpermission-form.component.html',
  styleUrls: ['./solutionpermission-form.component.scss']
})
export class SolutionpermissionFormComponent implements OnInit {

  constructor(
    private solutionPermissionService: SolutionpermissionService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private licenseService: LicenseService,
    private accountService: AccountService,
    private integratorService : IntegratorService,
    private projectService : ProjectService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  
  currentUser: iUser;
  buttonText: string;
  solutionpermission: Partial<iSolutionPermission> = {};
  licenses: iLicense[];
  accounts : iAccount[];
  integrators : iIntegrator[];
  projects : iProject[];

  returnUrl: string;

  
  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {
      key: 'permissiontype',
      type: 'select',
      templateOptions: {
        label: 'Permission Type',
        placeholder: '------------',
        required: true,
        options: [
          {
            value: "1",
            label: 'Account'
          },
          {
            value: "2",
            label: 'Integrator'
          },
          {
            value: "3",
            label: 'Project'
          },
          {
            value: "4",
            label: 'License'
          },
       

        ],

      },
      // expressionProperties: {
      //   'templateOptions.readonly': readOnly => this.userTypeReadOnly,
      // }
    },

    {
      key: 'accountidp',
      type: 'select',
      templateOptions: {
        label: 'Account',
        placeholder: '------------',
     //   required: true,
        options: this.accountService.getLookup(),
        valueProp: 'accountid',
        labelProp: 'companyname',
      },
      hideExpression: () => this.solutionpermission.permissiontype!=1,
    },
    {
      key: 'integratorid',
      type: 'select',
      templateOptions: {
        label: 'Integrator',
        placeholder: '------------',
     //   required: true,
        options: this.integratorService.getLookup(),
        valueProp: 'integratorid',
        labelProp: 'companyname',
      },
      hideExpression: () => this.solutionpermission.permissiontype!=2,
    },
    {
      key: 'projectid',
      type: 'select',
      templateOptions: {
        label: 'Project',
        placeholder: '------------',
     //   required: true,
        options: this.projectService.getLookup(),
        valueProp: 'projectid',
        labelProp: 'name',
      },
      hideExpression: () => this.solutionpermission.permissiontype!=3,
    },
    {
      key: 'licenseid',
      type: 'select',
      templateOptions: {
        label: 'License',
        placeholder: '------------',
     //   required: true,
        options: this.licenseService.getLookup(),
        valueProp: 'licenseid',
        labelProp: 'licensekey',
      },
      hideExpression: () => this.solutionpermission.permissiontype!=4,
    },

    {
      key: 'expirationdate',
      type: 'input',
      templateOptions: {
        type: 'date',
      
        label: 'Expiration Date'
      }
    },
  
  ]

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let solutionidParam = this.route.snapshot.paramMap.get('solutionid');
    let solutionpermissionid = this.route.snapshot.paramMap.get('id');

    if (solutionpermissionid == '0') {   // new record

      this.buttonText = "Create";
      this.solutionpermission = {
        solutionpermissionid : 0,
        solutionid : +solutionidParam,
  
      } as iSolutionPermission;
  
    }
    else {    // update old record
      this.buttonText = "Update";

      this.solutionPermissionService.get(solutionpermissionid)
        .subscribe(
          response => {
            this.solutionpermission = <iSolutionPermission>response;
         
            // console.log( this.solutionpermission);

            if (this.solutionpermission.solutionid == null) {
              this.router.navigate(['/home']);
            }

          },
          _error => {
            console.log('error');
          })
    }

  
  }

  LicenseKey(licenseid: number) {

    if (this.licenses != null) {
      let licensekey;
      this.licenses.forEach(element => {
        if (element.licenseid == licenseid) {
          licensekey = element.licensekey;
        }

      });

      return licensekey;
    }
  }
  submit() {
   
    if (this.solutionpermission.solutionpermissionid == 0) {
      this.solutionPermissionService.create(this.solutionpermission)
        .subscribe(response => {
   
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


       this.solutionPermissionService.update(this.solutionpermission)
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


    cancelRoute() {
      this.router.navigate([this.returnUrl]);
    }

}
