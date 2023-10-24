import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidateEmail } from '../_Validators/email.validator';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

declare var google: any;

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

   
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  // public socialUser: SocialUser = new SocialUser;
  socialUser!: SocialUser;
  isLoggedin?: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder : FormBuilder,
    // private socialAuthService: SocialAuthService
  ) {

    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }

  }

  model =
    {
      email: '',
      password: '',
     
    }

  form = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })
    // form = this.formBuilder.group({
    //   email : ['', [ValidateEmail]],
    //   password : ['',[Validators.required]]
    // })
  // fields: FormlyFieldConfig[] = [
  //   {
     
  //     fieldGroup: [
      
  //       {
  //         key: 'email',
  //         type: 'input',
  //         templateOptions: {
  //           type: 'email',
  //           label: 'Email',
  //           required: true,
  //         },
  //         validators: [
  //           { name: "email", validation: ValidateEmail }
  //         ],
  //       },
  //       {
  //         key: 'password',
  //         type: 'input',
  //         templateOptions: {
  //           type: 'password',
  //           label: 'Password',
  //           required: true
         
  //         },
  //       },
      
  //     ]

  //   }]


    ngAfterViewInit(): void {
      google.accounts.id.initialize({
         client_id: "236025958894-l05tha7iovc0ool81upch4i6gi91npe8.apps.googleusercontent.com",
      //  client_id: "18539700416-oeomktubrt07rqr2dniohvnk5se84ge5.apps.googleusercontent.com",
        callback: (response: any) => this.handleGoogleSignIn(response)
      });
      // google.accounts.id.renderButton(
      //   document.getElementById("buttonDiv"),
      //   {   type: "button" }  // customization attributes
      // );
    }
  
    handleGoogleSignIn(response: any) {
      console.log(response.credential);
  
      // This next is for decoding the idToken to an object if you want to see the details.
      let base64Url = response.credential.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log(JSON.parse(jsonPayload));
      
    }

  ngOnInit() {

    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl,'returnUrl')
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = user != null;
    //   console.log(this.socialUser);
    // });
  }
  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }

  submit() {
    this.submitted = true;

    this.loading = true;
    this.error = "";
    let email = this.form.get('email').value;
    let password = this.form.get('password').value;
    console.log('email', this.form.get('email').value);
    console.log('password', this.form.get('password').value);
    this.authenticationService.login(email, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
     //     console.log(error);
          //this.loading = false;
          this.error = error.error.message;
          this.form.setErrors({
            invalid: true,
          });
        });
        

  }



}
