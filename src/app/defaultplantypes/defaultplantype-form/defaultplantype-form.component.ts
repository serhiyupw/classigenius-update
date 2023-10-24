import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { DefaultplantypeService } from 'src/app/_services/defaultplantype.service';
import { iDefaultPlanType } from '../defaulrplantype';

@Component({
  selector: 'app-defaultplantype-form',
  templateUrl: './defaultplantype-form.component.html',
  styleUrls: ['./defaultplantype-form.component.scss']
})
export class DefaultplantypeFormComponent implements OnInit {

  constructor(

    private defaultPlanTypeService: DefaultplantypeService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  defaultplantype: Partial<iDefaultPlanType> = {};
  form = new FormGroup({})
  fields: FormlyFieldConfig[];
  buttonText: string;
  returnUrl: string;


  loadForms(): FormlyFieldConfig[] {
    return [

      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'defaultplantypeid',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: true,
              label: 'id',
              required: false,
              // minLength: 3,
            },

          }
        ]
      },
     
      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'name',
            type: 'input',
            className: 'col-7',
            templateOptions: {
              type: 'text',

              label: 'name',
              required: true,
              minLength: 3,
            },
          }
        ]
      }
    ]
  }


  ngOnInit(): void {

    this.fields = this.loadForms();

    let defaultplantypeid = this.route.snapshot.paramMap.get('id');

    if (defaultplantypeid == '0') {   // new record

      this.buttonText = "Create";
      this.defaultplantype = {
        defaultplantypeid: 0,
        name: ''
      }


    }
    else {
      this.buttonText = "Update";
      this.defaultPlanTypeService.get(defaultplantypeid)
        .subscribe(
          response => {
            this.defaultplantype = <iDefaultPlanType>response;

            if (this.defaultplantype.defaultplantypeid == null) {
              this.router.navigate(['/home']);
            }

          },
          _error => {
            console.log('error');
          })
    }

  }


  submit() {
    if (this.defaultplantype.defaultplantypeid == 0) {
      this.defaultPlanTypeService.create(this.defaultplantype)
        .subscribe(
          response => {
            this.router.navigate(['/defaultplantypes']);
          },
          _error => {
            console.log('error');
          })
    }
    else {
      this.defaultPlanTypeService.update(this.defaultplantype)
        .subscribe(
          response => {
            this.router.navigate(['/defaultplantypes']);
          },
          _error => {
            console.log('error');
          })
    }
  }

}
