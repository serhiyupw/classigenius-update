// import { NotificationDialogComponent } from './../_helpers/notification-dialog/notification-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ValidateEmail } from '../_Validators/email.validator';
import { NotificationDialogComponent } from '../_helpers/notification-dialog/notification-dialog.component';


// export interface iRequestResponse {
//   message: string,
//  }
@Component({
  selector: 'forgotpassword-form',
  templateUrl: './forgotpassword-form.component.html',
  styleUrls: ['./forgotpassword-form.component.scss']
})
export class ForgotpasswordFormComponent implements OnInit {

  constructor(
  
    private route: ActivatedRoute,
    private router: Router,
    private notificationdialog : NotificationDialogComponent,
    private authenticationService: AuthenticationService)
   { }

  
  message = '';
  error = '';
  //errors = false;


  model =
    {
      email: '',
    }


  form = new FormGroup({
    email : new FormControl('')
  })

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
          
  //       }
      
  //     ]

  //   }]


  ngOnInit(): void {
  }

  onSubmit({ valid, value }) {
    let email = this.form.get('email').value;
    this.authenticationService.requestforgotpasswordLink(email)
      .subscribe(
        response => {
     
          this.message = response.message;
       //   this.errors = false;
          this.notificationdialog.displayNotificationMessege("",response.message,"Ok","")
          .subscribe(dialogResult => {
            this.router.navigate(['/home']);
          })
        
        },
        error => {
     
          this.error = error.error.message; 
      
          this.form.setErrors({
            invalid: true,
          });
      
        
        }
      )
      
  }

}
