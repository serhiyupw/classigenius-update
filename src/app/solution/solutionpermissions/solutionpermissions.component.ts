import { iProject } from './../../projects/project';
import { ProjectService } from './../../_services/project.service';
import { iIntegrator } from './../../integrators/iIntegrator';
import { IntegratorService } from 'src/app/_services/integrator.service';
import { iAccount } from 'src/app/account/iAccount';
import { AccountService } from 'src/app/_services/account.service';
import { iLicense } from './../../licenses/license';
import { LicenseService } from 'src/app/_services/license.service';
import { SolutionpermissionService } from './../../_services/solutionpermission.service';
import { iSolutionPermission } from './../solutionpermission';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iUser } from 'src/app/users/iUser';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SolutionService } from 'src/app/_services/solution.service';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { iSolution } from '../solution';

@Component({
  selector: 'app-solutionpermissions',
  templateUrl: './solutionpermissions.component.html',
  styleUrls: ['./solutionpermissions.component.scss']
})
export class SolutionpermissionsComponent implements OnInit {

  constructor(
    private solutionService: SolutionService,
    private IntegratorService: IntegratorService,
    private accountService: AccountService,
    private projectService: ProjectService,
    private licenseService: LicenseService,
    private solutionpermissionService: SolutionpermissionService,
    private authenticationService: AuthenticationService,
    private confirmDelete: ConfirmDeleteComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: iUser;
  solutionpermissions: iSolutionPermission[];
  licenses: iLicense[];
  accounts: iAccount[];
  integrators: iIntegrator[];
  projects: iProject[];
  solutionid: string;
  solution : iSolution;
  solutionName : Text;

  ngOnInit(): void {
    this.solutionid = this.route.snapshot.paramMap.get('id');

    this.solutionService.get(this.solutionid)
    .subscribe(
      response => {
        this.solution = <iSolution>response;
        this.solutionName = this.solution.name ;
     
        if (this.solution.solutionid == null) {
          this.router.navigate(['/home']);
        }

      },
      _error => {
        console.log('error');
      })

   
    this.solutionpermissionService.getLookup("solutionid", +this.solutionid)
      .subscribe(
        response => {
          this.solutionpermissions = <iSolutionPermission[]>response;
          //       console.log(this.solutionpermissions);

        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.licenseService.getAll()
      .subscribe(
        response => {
          this.licenses = <iLicense[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.accountService.getAll()
      .subscribe(
        response => {
          this.accounts = <iAccount[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.IntegratorService.getAll()
      .subscribe(
        response => {
          this.integrators = <iIntegrator[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.projectService.getAll()
      .subscribe(
        response => {
          this.projects = <iProject[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })

  }

  SolutionPermissionFormRoute(solutionPermissionid: number, route: string) {
    this.router.navigate(['/solutionpermission', this.solutionid, solutionPermissionid], { queryParams: { returnUrl: route } });
  }

  AccountName(accountid: number) {

    if (this.accounts != null) {
      let accountname;
      this.accounts.forEach(element => {
        if (element.accountid == accountid) {
          accountname = element.companyname;
        }

      });

      return accountname;
    }
  }

  IntegratorName(integratorid: number) {

    if (this.integrators != null) {
      let integratorname;
      this.integrators.forEach(element => {
        if (element.integratorid == integratorid) {
          integratorname = element.companyname;
        }

      });

      return integratorname;
    }
  }

  ProjectName(projectid: number) {

    if (this.projects != null) {
      let projectname;
      this.projects.forEach(element => {
        if (element.projectid == projectid) {
          projectname = element.name;
        }

      });

      return projectname;
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


  PermissionValue(permission: iSolutionPermission) {

    if (permission.permissiontype == 1) {
      return this.AccountName(permission.accountidp);
    }
    else if (permission.permissiontype == 2) {
      return this.IntegratorName(permission.integratorid);
    }
    else if (permission.permissiontype == 3) {
      return this.ProjectName(permission.projectid);
    }
    else if (permission.permissiontype == 4) {
      return this.LicenseKey(permission.licenseid);
    }

  }

  PermissionType(permissiontype: number) {
    // console.log(permissiontype);
    if (permissiontype == 1) {
      return 'Account';
    }
    else if (permissiontype == 2) {
      return 'Integrator';
    }
    else if (permissiontype == 3) {
      return 'Project';
    }
    else if (permissiontype == 4) {
      return 'License';
    }
  }


  delete(solutionpermission: iSolutionPermission) {
    this.confirmDelete.displayDeleteConfirmationMessege()

      .subscribe(dialogResult => {

        if (dialogResult) {
          this.solutionpermissionService.delete(solutionpermission.solutionpermissionid)
            .subscribe(response => {
              let index = this.solutionpermissions.indexOf(solutionpermission);
              this.solutionpermissions.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

  backroute() {
    this.router.navigate(['/solutions']);
  }
}
