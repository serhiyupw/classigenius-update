import { iSolutionVersion } from './../solutionversion';
import { SolutionversionService } from './../../_services/solutionversion.service';
import { Component, OnInit } from '@angular/core';
import { SolutionService } from 'src/app/_services/solution.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { iUser } from 'src/app/users/iUser';
import { iLicense } from 'src/app/licenses/license';
import { iSolution } from '../solution';

@Component({
  selector: 'app-solutionversions',
  templateUrl: './solutionversions.component.html',
  styleUrls: ['./solutionversions.component.scss']
})
export class SolutionversionsComponent implements OnInit {

  constructor(
    private solutionService: SolutionService,
    private solutionversionService: SolutionversionService,
    private authenticationService: AuthenticationService,
    private confirmDelete: ConfirmDeleteComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  currentUser: iUser;
  solutionversions: iSolutionVersion[];
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

    this.solutionversionService.getLookup("solutionid", +this.solutionid)
      .subscribe(
        response => {
          this.solutionversions = <iSolutionVersion[]>response;
          //       console.log(this.solutionpermissions);

        },
        error => {
          alert('Error');
          console.log('error');
        })


  }


  SolutionVersionsFormRoute(solutionPermissionid: number, route: string) {

    this.router.navigate(['/solutionversion', this.solutionid, solutionPermissionid], { queryParams: { returnUrl: route } });
  }



  delete(solutionversion: iSolutionVersion) {
    this.confirmDelete.displayDeleteConfirmationMessege()

      .subscribe(dialogResult => {

        if (dialogResult) {
          this.solutionversionService.delete(solutionversion.solutionversionid)
            .subscribe(response => {
              let index = this.solutionversions.indexOf(solutionversion);
              this.solutionversions.splice(index, 1);
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
