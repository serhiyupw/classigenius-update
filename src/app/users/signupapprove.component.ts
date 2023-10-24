import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

export interface iRequestactivationcodeResponse {
  message: string,
 }

@Component({
  selector: 'signupapprove',
  templateUrl: './signupapprove.component.html',
  styleUrls: ['./signupapprove.component.scss']
})
export class SignupapproveComponent implements OnInit {

  message = '';
  error = '';
  errors = false;
  email  = '';

  activationcodeResponse: iRequestactivationcodeResponse;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,) { }
 
  ngOnInit(): void {
  
    let activationcode = this.route.snapshot.paramMap.get('activationcode');
    this.email = this.route.snapshot.paramMap.get('email');
   // console.log(activationcode);
  //  console.log(this.email);

    this.authenticationService.validateActivationCode( activationcode, this.email)
    .subscribe(
      response => {
     //     console.log(response);
          this.message = response.message;
      },
      error => {
     //   console.log(error);
        this.error = error.error.message; 
        this.errors = true;
      }
    )
   
}

requestactivationCode() : void{
  this.authenticationService.requestactivationcode(  this.email)
  .subscribe(
    response => {
      console.log(response);
      this.activationcodeResponse = <iRequestactivationcodeResponse> response;
      this.message = response.message;
      this.errors = false;
     
    },
    error => {
      console.log(error);
      this.error = error.error.message; 
      this.errors = true;
    }
  )
  
}

}
