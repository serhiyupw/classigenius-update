import { ProjectService } from './../_services/project.service';
import { Component, OnInit } from '@angular/core';
import { iProject } from './project';
import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';
import { iIntegrator } from '../integrators/iIntegrator';
import { IntegratorService } from '../_services/integrator.service';
import { Router } from '@angular/router';
import { iAccount } from '../account/iAccount';
import { AuthenticationService } from '../_services/authentication.service';
import { iUser } from '../users/iUser';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  currentUser: iUser;
  projects: iProject[];
  projectsFiltered: iProject[];
  integrators: iIntegrator[] = [];
  accounts: iAccount[] = [];
  integratorsFiltered: iIntegrator[] = [];

  selectAccount: number = 0;
  selectIntegrator: number = 0;

  constructor(
    private router: Router,
    private service: ProjectService,
    public confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
    private integratorService: IntegratorService,
    private accountService: AccountService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        response => {
          this.projects = <iProject[]>response;
          this.OnAccountSelect();
        },
        error => {
          alert('Error');
          console.log('error');
        })

    this.integratorService.getAll()
      .subscribe(
        response => {
          this.integrators = <iIntegrator[]>response;

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

  }


  OnAccountSelect() {
    // console.log(this.selectAccount);
    this.selectIntegrator = 0;

    this.integratorsFiltered = this.integrators.filter((obj) => {
      return obj.accountid == this.selectAccount;
    })

    this.FilterRecords();
  }


  OnIntegratorSelect() {
     console.log(this.selectIntegrator);

    this.FilterRecords();
  }


  FilterRecords() {
    this.projectsFiltered = this.projects;

    if (this.selectAccount != 0) {
      this.projectsFiltered = this.projectsFiltered.filter((obj) => {
        return obj.accountid == this.selectAccount;
      })
    }

    if (this.selectIntegrator != 0) {
      this.projectsFiltered = this.projectsFiltered.filter((obj) => {
        return obj.integratorid == this.selectIntegrator;
      })
    }
  }

  isAdminUser(): Boolean {
    return (this.currentUser.usertype == 5);
  }

  isIntegratorUser(): Boolean {
    return (this.currentUser.usertype == 3);
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

  delete(project: iProject) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      //  this.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(project.projectid)
            .subscribe(response => {
              let index = this.projects.indexOf(project);
              this.projects.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

  projectRoute(projectid: number, route: string) {
    this.router.navigate(['/project', projectid], { queryParams: { returnUrl: route } });
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

}
