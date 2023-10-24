import { iAccount } from 'src/app/account/iAccount';
import { AccountService } from 'src/app/_services/account.service';
import { iUser } from 'src/app/users/iUser';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from './../../_services/project.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IntegratorService } from 'src/app/_services/integrator.service';
import { UserService } from 'src/app/_services/user.service';
import { ValidateEmail } from 'src/app/_Validators/email.validator';
import { AuthenticationService } from 'src/app/_services/authentication.service';
//import { Observable } from 'rxjs/internal/Observable';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface LookupList { value: string, label: string };

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(
    private service: UserService,
    private integratorService: IntegratorService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //  console.log(this.currentUser);


    this.userTypeReadOnly;

  }

  currentUser: iUser;
  user: iUser;
  buttonText: string;
  returnUrl: string;

  userTypeReadOnly: boolean;
  integraorReadOnly: boolean;
  projectReadOnly: boolean;
  accountHidden: boolean;
  accounts: iAccount[];

  accountTypeLookupList: Array<LookupList> = [];


  form = new FormGroup({})

  fields: FormlyFieldConfig[];

  loadForms(): FormlyFieldConfig[] {

    return [

      {
        key: 'usertype',
        type: 'select',
        templateOptions: {
          label: 'User Type',
          placeholder: '------------',
          required: true,
          options: this.generateusertypelookup(),
        },
        expressionProperties: {

          'templateOptions.disabled': readOnly => this.userTypeReadOnly,
        },
      },
      {
        key: 'accountid',
        type: 'select',

        templateOptions: {
          label: 'account',
          placeholder: '------------',
          required: true,
          options: this.accountService.getLookup(),
          valueProp: 'accountid',
          labelProp: 'companyname',
        },
        hideExpression: hidden => !this.isAdminUser(),
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email',
          required: true,
        },
        expressionProperties: {
          'templateOptions.disabled': model => model.userid > 0,
        },
        validators: [
          { name: "email", validation: ValidateEmail }
        ],
      },
      {
        key: 'fullname',
        type: 'input',

        templateOptions: {
          type: 'text',
          label: 'Full Name',
          required: false,
          minLength: 3,
        },
      },
      {
        template: '<br/ >',
      },
      {
        key: 'integratorid',
        type: 'select',

        templateOptions: {
          label: 'Integrator',
          placeholder: '------------',
          //   required: true,
          options: this.integratorService.getLookup(),
          valueProp: 'integratorid',
          labelProp: 'companyname',
        },
        hideExpression: 'model.usertype < 3',

        expressionProperties: {
          'templateOptions.disabled': model => model.usertype < 3 || this.integraorReadOnly,
          'templateOptions.required': model => model.usertype >= 3,

          'model.integratorid': ' model.usertype >= 3 ? model.integratorid : null',

        }
      },
      {
        key: 'projectid',
        type: 'select',
        templateOptions: {
          label: 'Project',
          placeholder: '------------',

          options: [],
          // options: this.projectService.getLookup(),
          valueProp: 'projectid',
          labelProp: 'name',
        },
        hideExpression: 'model.usertype < 4',
        expressionProperties: {

          'templateOptions.required': model => model.usertype == 4,
          'model.projectid': ' model.usertype >= 4 ? model.projectid : null',
          'templateOptions.disabled': readonly => this.projectReadOnly,

        },
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.options = field.form
              .get('integratorid')
              .valueChanges.pipe(

                switchMap(integratorid => {

                  return this.projectService.getLookup("integratorid", integratorid);

                })
              );
          }
        }
      },
      {
        template: '<br/ >',
      },
      {
        key: 'userblocked',
        type: 'checkbox',
        templateOptions: {
          label: 'User Blocked',
        }
    
      }

    ]
  };

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //  console.log("start init");

    this.updateAccountTypeLookup();
    this.fields = this.loadForms();

    // console.log(this.fields);

    let userid = this.route.snapshot.paramMap.get('id');


    if (userid == '0') {   // new record

      this.buttonText = "Create";
      this.user = {
        userid: 0,
      } as iUser;

    }
    else {    // update old record
      this.buttonText = "Update";

      this.service.get(userid)
        .subscribe(
          response => {
            this.user = <iUser>response;

        //   console.log(this.user.userblocked);
            this.userTypeReadOnly = this.isCurrentUser(this.user.userid, this.currentUser.userid);
            this.integraorReadOnly = this.isCurrentUser(this.user.userid, this.currentUser.userid);
            this.projectReadOnly = this.isCurrentUser(this.user.userid, this.currentUser.userid);
            this.accountHidden = !this.isAdminUser();

            if (this.user.userid == null) {
              this.router.navigate(['/home']);
            }

          },
          _error => {
            console.log('error');
          })
    }

    this.accountService.getAll()
      .subscribe(
        response => {
          this.accounts = <iAccount[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })

  }



  isAdminUser(): Boolean {
    //  console.log(this.currentUser.usertype);
    return (this.currentUser.usertype == 5);
  }
  isCurrentUser(userid: number, currentUser: number): boolean {
    if (this.user.userid == this.currentUser.userid) {
      return true;
    }
    return false;
  }


  updateAccountTypeLookup() {

    this.accountTypeLookupList = [
      {
        value: "1",
        label: 'Account Contact'
      },
      {
        value: "2",
        label: 'Account Manager'
      },
      {
        value: "3",
        label: 'Integrator'
      },
      {
        value: "4",
        label: 'Project Manager'
      },
      {
        value: "6",
        label: 'Web project user'
      }
    ];
    if (this.currentUser.usertype == 5)
      this.accountTypeLookupList.push(
        {
          value: "5",
          label: 'Admin'
        }
      );


    //console.log(this.currentUser);
    // console.log(this.accountTypeLookupList);

  }

  generateusertypelookup(): Observable<any[]> {
   
    this.updateAccountTypeLookup();
    return of(this.accountTypeLookupList);
  }

  cancelRoute() {
    this.router.navigate([this.returnUrl]);
  }


  submit() {

   // console.log(this.user);
    if (this.user.userid == 0) {
      this.service.createastandarduser(this.user)
        .subscribe(response => {
          //   this.router.navigate(['/users']);
          this.router.navigate([this.returnUrl]);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {

      this.service.update(this.user)
        .subscribe(response => {

          var currentUSer = this.isCurrentUser(this.user.userid, this.currentUser.userid);
          if (currentUSer) {
            this.authenticationService.updateuserFullName(this.user.fullname);

          }
          this.router.navigate([this.returnUrl]);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      };
    }
  }

}
