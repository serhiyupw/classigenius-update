import { UserService } from './../_services/user.service';
import { iAccount } from './../account/iAccount';
import { iUser } from './iUser';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormlyConfig, FormlyField, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { ValidateEmail } from '../_Validators/email.validator';
import { CheckPasswords } from '../_Validators/passwordconfirm.validator';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})

export class SignupFormComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  buttonText: string;
  user: iUser;
  account: iAccount;
  error = '';

  // model =
  //   {
  //     companyname: '',
  //     contact: '',
  //     email: '',
  //     password: '',
  //     password2: '',
  //   }


  form = new FormGroup({
    companyname : new FormControl(''),
    contact : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    password2 : new FormControl(''),
  })

  // fields: FormlyFieldConfig[] = [
  //   {
  //     validators: [
  //       { name: 'checkpasswords', validation: CheckPasswords },
  //     ],
  //     fieldGroup: [
  //       {
  //         key: 'companyname',
  //         type: 'input',
  //         templateOptions: {
  //           label: 'Company Name',
  //           required: true,
  //           minLength: 3
  //         },

  //       },
  //       {
  //         key: 'contact',
  //         type: 'input',
  //         templateOptions: {

  //           label: 'Contact Name',
  //           required: true,
  //           minLength: 3
  //         },

  //       },
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
  //           placeholder: 'Must be at least 6 characters',
  //           required: true,
  //           minLength: 6,
  //         },
  //       },
  //       {
  //         key: 'password2',
  //         type: 'input',
  //         templateOptions: {
  //           type: 'password',
  //           label: 'Confirm Password',
  //           placeholder: 'Please re-enter your password',
  //           required: true,
  //         },
  //       }
  //     ]

  //   }]

  ngOnInit(): void {
      console.log(this.form.errors);
  
  }

  onSubmit({ valid, value }) {
    if(this.form.get('password').value != this.form.get('password2').value)
    {
      this.error = "Conform  password is not correct";
      this.form.setErrors({
        invalid: true
      });
      return
    }
    console.log(this.form.value,'form-data')
    this.userService.createaccountmanager(this.form.value)
      .subscribe(
        response => {
          this.router.navigate(['/signupconfirmation']);
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

}

