import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { AuthenticationService } from '../_services/authentication.service';
import { CheckPasswords } from '../_Validators/passwordconfirm.validator';
import { NotificationDialogComponent } from '../_helpers/notification-dialog/notification-dialog.component';


@Component({
  selector: 'passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

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
    this.authenticationService.changepassword(this.email, this.activationcode, this.model.password)
      .subscribe(
        response => {
          this.notificationdialog.displayNotificationMessege("", "Password reset succesfully", "Ok", "")
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
