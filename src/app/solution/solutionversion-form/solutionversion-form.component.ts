import { iSolutionVersion } from './../solutionversion';
import { SolutionversionService } from './../../_services/solutionversion.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iUser } from 'src/app/users/iUser';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-solutionversion-form',
  templateUrl: './solutionversion-form.component.html',
  styleUrls: ['./solutionversion-form.component.scss']
})
export class SolutionversionFormComponent implements OnInit {

  
  constructor(
    private solutionVersionService: SolutionversionService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  
  currentUser: iUser;
  buttonText: string;
  solutionversion: Partial<iSolutionVersion> = {};
 
  returnUrl: string;

  
  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {
      key: 'ctversion',
      type: 'input',

      templateOptions: {
        type: 'text',

        label: 'Ct Version',
        required: true,
        minLength: 3,
      },

    },
    {
      key: 'ownerversion',
      type: 'input',

      templateOptions: {
        type: 'text',
        label: 'Owner Version',
      },

    },
    {
      key: 'uploadtime',
      type: 'input',

      templateOptions: {
        type: 'text',
        readonly: true,
        label: 'Upload Time',
      
        minLength: 3,
      },

    },
    {
      key: 'filesize',
      type: 'input',

      templateOptions: {
        type: 'text',
        readonly: true,
        label: 'File Size',
      
        minLength: 3,
      },

    },
    {
      key: 'comments',
      type: 'input',

      templateOptions: {
        type: 'text',

        label: 'Comments',
      
        minLength: 3, 
      },

    },
  
  ]

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let solutionidParam = this.route.snapshot.paramMap.get('solutionid');
    let solutionversionid = this.route.snapshot.paramMap.get('id');

    // if (solutionversionid == '0') {   // new record

    //   this.buttonText = "Create";
    //   this.solutionversion = {
    //     solutionversionid: 0,
    //     solutionid : +solutionidParam,
  
    //   } as iSolutionVersion;
  
    // }
  //  else 
    {    // update old record
      this.buttonText = "Update";

      this.solutionVersionService.get(solutionversionid)
        .subscribe(
          response => {
            this.solutionversion = <iSolutionVersion>response;
         
       //      console.log( this.solutionversion);

            if (this.solutionversion.solutionid == null) {
              this.router.navigate(['/home']);
            }

          },
          _error => {
            console.log('error');
          })
    }
  }


  submit() {

 
    if (this.solutionversion.solutionversionid == 0) {
      this.solutionVersionService.create(this.solutionversion)
        .subscribe(response => {
   
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

       this.solutionVersionService.update(this.solutionversion)
       .subscribe(response => {
     //   console.log('update ok');    
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

  
  cancelRoute() {
    this.router.navigate([this.returnUrl]);
  }

}
