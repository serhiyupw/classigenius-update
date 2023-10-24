import { ProjectService } from './../_services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iProject } from './project';
import { IntegratorService } from '../_services/integrator.service';
import { iIntegrator } from '../integrators/iIntegrator';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AccountService } from '../_services/account.service';
import { iUser } from '../users/iUser';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private service: ProjectService,
    private integratorService: IntegratorService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }


  currentUser: iUser;
  project: iProject;
  returnUrl: string;

  buttonText: string;
  integrators: iIntegrator[];

  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [

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

    {
      key: 'integratorid',
      type: 'select',

      templateOptions: {
        label: 'Integrator',
        placeholder: '------------',
        required: true,
        options: this.integratorService.getLookup( ),
        valueProp: 'integratorid',
        labelProp: 'companyname',
        // readonly:  this.currentUser.usertype == 4 //  this.isProjectUser(),
      },
      hideExpression: () => this.currentUser.usertype == 3 || this.currentUser.usertype == 4
    },

    {
      key: 'name',
      type: 'input',

      templateOptions: {
        type: 'text',

        label: 'Project Name',
        required: true,
        minLength: 3,
      },

    },
    {
      key: 'expirationdate',
      type: 'input',
      templateOptions: {
        type: 'date',
        //   readonly: true,
        label: 'Expiration Date'
      }
    },
    {
      key: 'projectkey',
      type: 'input',
      templateOptions: {

        readonly: true,
        label: 'Project Key'
      }
    },
  ]


  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let projectid = this.route.snapshot.paramMap.get('id');

    if (projectid == '0') {   // new record

      this.buttonText = "Create";
      this.project = {
        projectid: 0,
        active: true,
        integratorid: 0,

      } as iProject;

      console.log(this.project);

      if (this.currentUser.accountid>0 )
      { 
          this.project.accountid = this.currentUser.accountid;
          // console.log('account='+this.project.accountid);
      }
      if (this.currentUser.usertype == 3)
      {
         
          this.project.integratorid = this.currentUser.integratorid;
          // console.log('user integrator='+this.currentUser.integratorid);
          // console.log('project integrator='+this.project.integratorid);
      }
      // this.form.patchValue({
      //   active : true,
      // });
    }
    else {    // update old record
      this.buttonText = "Update";

      this.service.get(projectid)
        .subscribe(
          response => {
            this.project = <iProject>response;
            if (this.currentUser.accountid>0 )
            { 
               this.project.accountid = this.currentUser.accountid;
            }

            if (this.project.projectid == null) {
              this.router.navigate(['/home']);
            }

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

  }

  
  isAdminUser(): Boolean {
  //  console.log("isAdminUser:currentuser="+this.currentUser)
    return (this.currentUser.usertype == 5);
  }

  
  // isProjectUser(): boolean {
  //   console.log("isProjectUser:currentuser="+this.currentUser)
  //   if (this.currentUser == undefined)
  //   {
  //       return false;
  //   }
  //   return (this.currentUser.usertype == 4);
  // }

  submit() {
    // this.project.name = this.form.value.name;
    // this.project.integratorid = this.form.value.integratorid as unknown as number;
    // this.project.expirationdate = this.form.value.expirationdate as unknown as Date;
    // this.project.active = this.form.value.active as unknown as boolean;

    //    console.log(this.project);

    if (this.project.projectid == 0) {
      this.service.create(this.project)
        .subscribe(response => {
          //    this.router.navigate(['/projects']);
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
    this.service.update(this.project)
      .subscribe(response => {
        //    this.router.navigate(['/projects']);
        this.router.navigate([this.returnUrl]);
      })
    _error => {
      console.log('error');
      this.form.setErrors({
        invalid: true
      });
    };

  }

  // get name() {
  //   return this.form.get('name');
  // }
  // get integratorid() {
  //   return this.form.get('integratorid');
  // }
  // get projectkey() {
  //   console.log(this.form.get('projectkey'));
  //   return this.form.get('projectkey');
  // }


  cancelRoute() {
    this.router.navigate([this.returnUrl]);
  }
}
