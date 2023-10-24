
import { IntegratorService } from './../_services/integrator.service';
import { LicenseService } from './../_services/license.service';
import { iIntegrator } from './../integrators/iIntegrator';
import { Component, OnInit } from '@angular/core';
import { decodeLicFeatures, iLicense } from './license';
import { ProjectService } from '../_services/project.service';
import { iProject } from '../projects/project';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';
import { iUser } from '../users/iUser';
import { AuthenticationService } from '../_services/authentication.service';
import { iAccount } from '../account/iAccount';
import { AccountService } from '../_services/account.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlanService } from '../_services/plan.service';
import { iPlan } from '../plans/plan';
import { ConfirmMessageComponent } from '../_helpers/confirm-message/confirm-message.component';
import { userTypes } from '../_common/constants';
// import { Router } from '@angular/router';


@Component({
  selector: 'licenses',

  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})

export class LicensesComponent implements OnInit {

  constructor(
    private service: LicenseService,
    private projectService: ProjectService,
    private integratorService: IntegratorService,
    private confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private planService: PlanService,
    private confirmMessage: ConfirmMessageComponent,
    // private router: Router,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  currentUser: iUser;
  licenses: iLicense[];
  license: iLicense;
  licensesFiltered: iLicense[];
  projects: iProject[] = [];
  projectsFiltered: iProject[] = [];
  integrators: iIntegrator[] = [];
  integratorsFiltered: iIntegrator[] = [];
  plans: iPlan[] = [];

  accounts: iAccount[] = [];


  selectAccount: number = 0;
  selectIntegrator: number = 0;
  selectProject: number = 0;


  Filtermodel =
    {
      selectedAccount: 0,
      selectedIntegrator: 0,
      selectedProject: 0,

    }
  form = new FormGroup({})
  fields: FormlyFieldConfig[] = [

    {

      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'accountid',
          type: 'select',
          //  className: 'col-2',
          templateOptions: {
            label: 'Account',
            placeholder: '------------',

            options: this.accountService.getLookup(),
            valueProp: 'accountid',
            labelProp: 'companyname',
          },
          hideExpression: hidden => !this.isAdminUser(),
        },

        {
          key: 'integratorid',
          type: 'select',

          //  className: 'col-2',
          templateOptions: {
            label: 'Integrator',
            placeholder: '------------',

            options: this.integratorService.getLookup(),
            valueProp: 'integratorid',
            labelProp: 'companyname',
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              // field.templateOptions.options = field.form
              //   .get('integratorid')
              //   .valueChanges.pipe(

              //     switchMap(integratorid => {
              console.log("onchange integratorid");
              //       return this.projectService.getLookup("integratorid", integratorid);
              //     })
              //   );

            },
          }
        },
        {
          key: 'projectid',
          type: 'select',
          // className: 'flex-3',
          className: 'col-3',
          templateOptions: {
            label: 'Project',
            placeholder: '------------',

            options: [],
            valueProp: 'projectid',
            labelProp: 'name',
          },
          // hooks: {
          //   onInit: (field: FormlyFieldConfig) => {
          //     field.templateOptions.options = field.form
          //       .get('integratorid')
          //       .valueChanges.pipe(

          //         switchMap(integratorid => {
          //           //    console.log("onchange projectid");
          //           return this.projectService.getLookup("integratorid", integratorid);
          //         })
          //       );

          //   },

          // }
        },
      ]

    }


  ]

  ngOnInit(): void {


    this.selectAccount = this.currentUser.accountid;
    if (!this.ShowIntegratorField()) {  //this.currentUser.usertype == 3) {
      this.selectIntegrator = this.currentUser.integratorid;
    }
    if (!this.ShowProjectField()) {

      this.selectProject = this.currentUser.projectid;
      //   console.log( this.selectProject );
    }
    this.service.getAll()
      .subscribe(
        response => {
          this.licenses = <iLicense[]>response;
          this.FilterRecords();
        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.integratorService.getAll()
      .subscribe(
        response => {
          this.integrators = <iIntegrator[]>response;
          this.integratorsFiltered = this.integrators;

        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.projectService.getAll()
      .subscribe(
        response => {
          this.projects = <iProject[]>response;
          this.OnIntegratorSelect(false);

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


    this.accountService.getAll()
      .subscribe(
        response => {
          this.accounts = <iAccount[]>response;
          //       console.log(this.integrators);
        },
        error => {
          alert('Error');
          console.log('error');
        })


  }

  OnAccountSelect() {
    this.selectIntegrator = 0;
    this.selectProject = 0;
    // if (this.selectAccount != 0) {

    this.integratorsFiltered = this.integrators.filter((obj) => {
      return obj.accountid == this.selectAccount;
    })
    this.projectsFiltered = this.projects.filter((obj) => {
      return obj.integratorid == this.selectIntegrator;
    })
    // }
    this.FilterRecords();
  }

  OnIntegratorSelect(refresh: boolean) {

    this.selectProject = 0;
    this.projectsFiltered = [];

    // if (this.selectIntegrator != 0) {

    this.projectsFiltered = this.projects.filter((obj) => {
      return obj.integratorid == this.selectIntegrator;
    })


    // }
    if (refresh) {
      this.FilterRecords();
    }
  }

  FilterRecords() {

    this.licensesFiltered = this.licenses;

    if (this.selectAccount != 0) {

      this.licensesFiltered = this.licensesFiltered.filter((obj) => {
        return obj.accountid == this.selectAccount;
      })

      if (this.selectIntegrator != 0) {
        this.licensesFiltered = this.licensesFiltered.filter((obj) => {
          return obj.integratorid == this.selectIntegrator;
        })

        if (this.selectProject != 0) {
          this.licensesFiltered = this.licensesFiltered.filter((obj) => {
            return obj.projectid == this.selectProject;
          })
        }
      }
    }

  }


  isAccountUser(): boolean {

    return (this.currentUser.usertype == userTypes.AccountManager || this.currentUser.usertype == userTypes.AccountUser || this.currentUser.usertype == userTypes.Admin);
  }
  isIntegratorUser(): boolean {
    return (this.currentUser.usertype == userTypes.Integrator);

  }


  isWebProjectUser(): boolean {

    return (this.currentUser.usertype == userTypes.WebProjectUser);

  }

  isAdminUser(): Boolean {
    return (this.currentUser.usertype == userTypes.Admin);

  }
  ShowIntegratorField(): Boolean {

    return (this.currentUser.usertype != userTypes.Integrator && (this.currentUser.usertype != userTypes.ProjectUser) && (this.currentUser.usertype != userTypes.WebProjectUser));

  }

  ShowProjectField(): Boolean {
    return (this.currentUser.usertype != userTypes.ProjectUser && (this.currentUser.usertype != userTypes.WebProjectUser));
  }

  AccountName(accountid: number) {
    let name = "";
    this.accounts.forEach(element => {
      if (element.accountid == accountid) {
        name = element.companyname;
      }

    });

    return name;
  }

  IntegratorName(integratorid: number) {
    let name = "";
    this.integrators.forEach(element => {
      if (element.integratorid == integratorid) {
        name = element.companyname;
      }

    });

    return name;
  }

  ProjectName(projectid: number) {
    let name = "";

    this.projects.forEach(element => {
      if (element.projectid == projectid) {
        name = element.name;
      }

    });
    return name;
  }

  PlanName(planid: number) {
    let name = "";

    this.plans.forEach(element => {
      if (element.planid == planid) {
        name = element.description;
      }

    });

    return name;


  }

  PaymentStatus(licenseid: number) {
    let status = "";


    this.licenses.forEach(element => {
      if (element.licenseid == licenseid) {
        //    console.log(element);
        if (element.trial == true) {
          status = "Trial";
        }
        else if (element.paid == true) {
          status = "Paid";
        }
        else {
          status = "Not Paid"
        }
      }
      // console.log(status);
    });
    return status;
  }

  ActivationStatus(licenseid: number) {
    let status = "";
    this.licenses.forEach(element => {
      if (element.licenseid == licenseid) {

        if (element.active == true) {
          status = element.stationcodeactivated;
        }
        else {
          status = "Not Active"
        }
      }
      // console.log(status);
    });
    return status;
  }

  delete(license: iLicense) {
    let myArraySubject = new Subject<any[]>();
    this.confirmDelete.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(license.licenseid)
            .subscribe(response => {
              let index = this.licenses.indexOf(license);
              // console.log(index);
              this.licenses.splice(index, 1);
              // console.log(this.licenses);
              this.FilterRecords();

            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

  Purchase() {
    console.log("Purchase");

    // navigate to purchase page with licenseid parameter
  }

  generateNewlicensebasedOnPlan(plantypedefault: string) {
    {

      this.service.generatetriallicense(plantypedefault)
        .subscribe(
          response => {
            console.log(response);
            this.confirmMessage.displayConfirmationMessege('License Created').subscribe(result => {
            
              if (result === true) {
                location.reload();
              }
            })
          },
          error => {
            let errormessage = error.error.message;
            this.confirmMessage.displayErrorMessege(errormessage);
            console.log('error');
          }
        )


      // change cusrsor to hourglass
      // document.body.style.cursor = 'wait';


      // this.integratorService.getAll()
      //   .subscribe(
      //     response => {

      //       this.integrators = <iIntegrator[]>response;

      //       // set license instance 
      //       this.license = <iLicense>{};

      //       // check if integrators found
      //       if (this.integrators.length > 0) {
      //         this.license.integratorid = this.integrators[0].integratorid;    // get the first integrator
      //       }
      //       else {
      //         this.confirmMessage.displayConfirmationMessege('License can not be created, no integrators were defined.');
      //         return;
      //       }

      //       this.projectService.getAll()
      //         .subscribe(
      //           response => {
      //             this.projects = <iProject[]>response;
      //             if (this.projects.length > 0) {
      //               this.license.projectid = this.projects[0].projectid;
      //             }
      //             else {
      //               this.confirmMessage.displayConfirmationMessege('License can not be created, no projects were defined.');
      //               return;
      //             }

      //             this.planService.getByPlanTypeDefault(plantypedefault)
      //               .subscribe(
      //                 response => {
      //                   let plan = <iPlan>response;

      //                   this.license.planid = plan.planid;
      //                   this.license.maxpages = plan.maxpages;
      //                   this.license.maxfields = plan.maxfields;
      //                   this.license.maxpagesforpdfcreation = plan.maxpagesforpdfcreation;
      //                   this.license.maxcaptureinstances = plan.maxcaptureinstances;
      //                   this.license.maxocrinstances = plan.maxocrinstances;
      //                   this.license.trial = plan.trial;

      //                   this.license.featureslist = plan.featureslist;
      //                   this.license = decodeLicFeatures(this.license, plan.featureslist);

      //                   console.log(this.license)
      //                   this.service.create(this.license)
      //                     .subscribe(response => {

      //                       // change cusrsor to normal
      //                       document.body.style.cursor = 'default';

      //                       this.confirmMessage.displayConfirmationMessege('License Created').subscribe(result => {
      //                         console.log(result);
      //                         if (result === true) {
      //                           location.reload();
      //                         }
      //                       })

      //                     })
      //                   _error => {
      //                     // change cusrsor to normal
      //                     document.body.style.cursor = 'default';

      //                     this.confirmMessage.displayConfirmationMessege('License creation failed');
      //                     console.log('error');
      //                   }
      //                 }
      //               )

      //           }
      //         )
      //     }
      //   )

    }
  }

  emailLicense(licenseid: number) {

    this.service.emailLicense(licenseid)
      .subscribe(response => {
        console.log(response);
        this.confirmMessage.displayConfirmationMessege('License Emailed').subscribe(result => {
          console.log(result);
          if (result === true) {
            location.reload();
          }
        })
      })
    _error => {
      this.confirmMessage.displayConfirmationMessege('License email failed');
      console.log('error');
    }


  }
}




