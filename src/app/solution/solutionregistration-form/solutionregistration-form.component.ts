import { iSolutionregistration } from './../solutionregistration';
import { SolutionregistrationService } from './../../_services/solutionregistration.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iUser } from 'src/app/users/iUser';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'solutionregistration-form',
  templateUrl: './solutionregistration-form.component.html',
  styleUrls: ['./solutionregistration-form.component.scss']
})
export class SolutionregistrationFormComponent implements OnInit {

  constructor(
    private solutionRegistrationService: SolutionregistrationService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  
  currentUser: iUser;
  buttonText: string;
  solutionregistration: Partial<iSolutionregistration> = {};


  returnUrl: string;

  
  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {
    }
  ]

  
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let solutionidParam = this.route.snapshot.paramMap.get('solutionid');
    let solutionregistrationid = this.route.snapshot.paramMap.get('id');

    console.log( solutionregistrationid);

    {    // update old record
      this.buttonText = "Update";

      this.solutionRegistrationService.get(solutionregistrationid)
        .subscribe(
          response => {
            this.solutionregistration = <iSolutionregistration>response;
         
        //     console.log( this.solutionversion);

            // if (this.solutionregistration.solutionid == null) {
            //   this.router.navigate(['/home']);
            // }

          },
          _error => {
            console.log('error');
          })
    }
  }

  
  submit() {
  }

    
  cancelRoute() {
    this.router.navigate([this.returnUrl]);
  }

}
