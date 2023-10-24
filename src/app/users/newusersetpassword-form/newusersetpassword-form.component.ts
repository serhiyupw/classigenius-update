import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CheckPasswords } from 'src/app/_Validators/passwordconfirm.validator';
import { NotificationDialogComponent } from 'src/app/_helpers/notification-dialog/notification-dialog.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-newusersetpassword-form',
  templateUrl: './newusersetpassword-form.component.html',
  styleUrls: ['./newusersetpassword-form.component.scss']
})
export class NewusersetpasswordFormComponent implements OnInit {

 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationdialog : NotificationDialogComponent,
    private authenticationService: AuthenticationService
  ) { }

  error = '';

  email = '';
  activationcode = '';

  model =
    {
      password: '',
      password2: '',
    }


  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {
      validators: [
        { name: 'checkpasswords', validation: CheckPasswords },
      ],
      fieldGroup: [

        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Must be at least 6 characters',
            required: true,
            minLength: 6,
          },
        },
        {
          key: 'password2',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        }

      ]

    }]

  ngOnInit(): void {

    this.activationcode = this.route.snapshot.paramMap.get('activationcode');
    this.email = this.route.snapshot.paramMap.get('email');


  }

  onSubmit({ valid, value }) {

 
    document.body.style.cursor = 'wait';   // set wait cursor

    this.authenticationService.validateActivationCode( this.activationcode, this.email)
    .subscribe(
      response => {
     //     console.log(response);
       //   this.message = response.message;

       this.authenticationService.changepassword(this.email, this.activationcode, this.model.password)
       .subscribe(
         response => {

          console.log(response);

          // TODO:  check response . if errorcode != 0 then display error message
          if (response.errorcode != 0)
          {
            document.body.style.cursor = 'default';
            this.notificationdialog.displayNotificationMessege("", "User already exists, please login", "Ok", "")
            .subscribe(dialogResult => {
              this.router.navigate([ '/login']);
            })
          }


           // send activation email to user
           this.authenticationService.sendactivationemail(this.email)
            .subscribe(
              response => {
                console.log(response);
                this.notificationdialog.displayNotificationMessege("", "Your account has been successfully created. An email containing your account details and login instructions has been sent to you. You can now log in and proceed.", "Ok", "")
                .subscribe(dialogResult => {
                  // set normal cursor
                  document.body.style.cursor = 'default';
                  this.router.navigate(['/login']);
                })
              },
              error => {
                // console.log(error);
              }
            )

     
         
         },
         error => {
          document.body.style.cursor = 'default';
           this.error = error.error.message;
           this.form.setErrors({
             invalid: true,
           });
 
         }
       )


      },
      error => {
     
          this.notificationdialog.displayNotificationMessege("", "User is invalid or link expired.", "Ok", "")
          .subscribe(dialogResult => {
            this.router.navigate([ '/landingpage']);
          })

         
 
      }
    )

  

  }

}
