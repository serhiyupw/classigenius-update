import { SolutionService } from './../../_services/solution.service';
import { iSolution } from './../solution';
import { Component, OnInit } from '@angular/core';
import { iUser } from 'src/app/users/iUser';
import { iAccount } from 'src/app/account/iAccount';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {

  constructor(
    private router: Router,
    private service: SolutionService,
    private confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  currentUser: iUser;
  solutions: iSolution[];

  accounts: iAccount[] = [];

  ngOnInit(): void {

    this.service.getAll()
    .subscribe(
      response => {
        this.solutions = <iSolution[]>response;
     //   this.FilterRecords();
      },
      error => {
        alert('Error');
        console.log('error');
      })

  }

  solutionRoute(solutionid: number, route: string) {
  
    this.router.navigate(['/solution', solutionid], { queryParams: { returnUrl: route } });
  }

  delete(solution: iSolution) {
    this.confirmDelete.displayDeleteConfirmationMessege()

      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(solution.solutionid)
            .subscribe(response => {
              let index = this.solutions.indexOf(solution);
              this.solutions.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }

}
