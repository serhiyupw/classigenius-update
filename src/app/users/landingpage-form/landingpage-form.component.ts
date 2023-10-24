import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { iUser } from '../iUser';
import { iAccount } from 'src/app/account/iAccount';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidateEmail } from 'src/app/_Validators/email.validator';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-landingpage-form',
  templateUrl: './landingpage-form.component.html',
  styleUrls: ['./landingpage-form.component.scss']
})
export class LandingpageFormComponent implements OnInit {

  currentUser: iUser;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     
    }

  buttonText: string;
  user: iUser;
  account: iAccount;
  error = '';

  model =
    {
      companyname: '',
      contactname: '',
      email: '',
      phone: '',
      country : ''
    
    }


  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {
      // validators: [
      //   { name: 'checkpasswords', validation: CheckPasswords },
      // ],
      fieldGroup: [
        {
          key: 'contactname',
          type: 'input',
          templateOptions: {
            label: 'Full Name',
            required: true,
            minLength: 3
          },

        },
        {
          key: 'companyname',
          type: 'input',
          templateOptions: {
            label: 'Company Name',
            required: true,
            minLength: 3
          },

        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email',
            required: true,
          },
          validators: [
            { name: "email", validation: ValidateEmail }
          ],
        },
        {
          key: 'phone',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Phone',
            required: true,
            minLength: 7,
          },
        },
        {
          key: 'country',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Country',
             required: true,
            minLength: 3,
          },
        }
      
      ]

    }]

  ngOnInit(): void {
    this.authenticationService.logout();
      // console.log(this.form.errors);
  
  }

  onSubmit({ valid, value }) {
    this.userService.createintegratoruser(this.model)
      .subscribe(
        response => {
          this.router.navigate(['/signupconfirmation/'+this.model['email']]);
        },
        error => {
          console.log(error);
          this.error = error.error.message; 
          this.form.setErrors({
            invalid: true
          });
        }
      )
      
  }

  login() {

   const externalPageUrl = '/classigenius/#/login';

   // Check if the parent window is available and then navigate to the external page.
   if (window.parent) {
     window.parent.location.href = externalPageUrl;
   } else {
     console.error('Parent window not found. Navigation failed.');
   }
}

}


