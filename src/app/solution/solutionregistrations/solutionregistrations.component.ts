import { LicenseService } from './../../_services/license.service';
import { SolutionregistrationService } from './../../_services/solutionregistration.service';
import { iSolutionregistration } from './../solutionregistration';
import { Component, OnInit } from '@angular/core';
import { iLicense } from 'src/app/licenses/license';
import { iUser } from 'src/app/users/iUser';
import { iSolution } from '../solution';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionService } from 'src/app/_services/solution.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';

@Component({
  selector: 'solutionregistrations',
  templateUrl: './solutionregistrations.component.html',
  styleUrls: ['./solutionregistrations.component.scss']
})
export class SolutionregistrationsComponent implements OnInit {

  constructor(
    private solutionService: SolutionService,
    private licenseService: LicenseService,
    private solutionregistrationService: SolutionregistrationService,
    private authenticationService: AuthenticationService,
    private confirmDelete: ConfirmDeleteComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  currentUser: iUser;
  solutionregistrations: iSolutionregistration[];
  licenses: iLicense[];
  solutionid: string;
  solution: iSolution;
  solutionName: Text;


  ngOnInit(): void {

    this.solutionid = this.route.snapshot.paramMap.get('id');

    this.solutionService.get(this.solutionid)
      .subscribe(
        response => {
          this.solution = <iSolution>response;
          this.solutionName = this.solution.name;

          if (this.solution.solutionid == null) {
            this.router.navigate(['/home']);
          }

        },
        _error => {
          console.log('error');
        })

    this.solutionregistrationService.getLookup("solutionid", +this.solutionid)
      .subscribe(
        response => {
          this.solutionregistrations = <iSolutionregistration[]>response;


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



  }

  SolutionRegistrationFormRoute(solutionRegistration: number, route: string) {
    console.log(this.solutionid);
    console.log(solutionRegistration);
    this.router.navigate(['/solutionregistration', this.solutionid, solutionRegistration], { queryParams: { returnUrl: route } });
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


  

  delete(solutionregistration: iSolutionregistration) {
    this.confirmDelete.displayDeleteConfirmationMessege()

      .subscribe(dialogResult => {

        if (dialogResult) {
          this.solutionregistrationService.delete(solutionregistration.solutionregistrationid)
            .subscribe(response => {
              let index = this.solutionregistrations.indexOf(solutionregistration);
              this.solutionregistrations.splice(index, 1);
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
