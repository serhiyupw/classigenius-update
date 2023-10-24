import { DefaultplantypeService } from './../../_services/defaultplantype.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from 'src/app/_services/plan.service';
import { decodeLicFeatures, iPlan } from '../plan';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { userTypes } from 'src/app/_common/constants';
import { iUser } from 'src/app/users/iUser';
import { AuthenticationService } from 'src/app/_services/authentication.service';

interface LookupList { value: string, label: string };

@Component({
  selector: 'plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  constructor(
    private planservice: PlanService,
    private  defaultplantypeservice : DefaultplantypeService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: iUser;
  plan: iPlan ;
  form = new FormGroup({})
  fields: FormlyFieldConfig[];
  buttonText: string;
  returnUrl: string;

  ExpirationMethodLookupList: Array<LookupList> = [];

  PlanTypeDefaultLookupList: Array<LookupList> = [];

  loadForms(): FormlyFieldConfig[] {
    return [

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'description',
            type: 'input',
            className: 'col-7',
            templateOptions: {
              type: 'text',

              label: 'Description',
              required: true,
              minLength: 3,
            },
          }
        ]
      },

      {
        template: '<br/ >',
      },
      {
        key: 'trial',
        type: 'checkbox',
        className: 'col-2',
        templateOptions: {
          label: 'Trial',
        },
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [

          {
            key: 'trialperioddays',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Trial Period - Days',
              required: true,

            },
            validators: {
              trialperioddays: (control) => {
                const value = control.value;
                if (value != 0) {
                  return { trialperioddays: 'Value cannot be zero' };
                }
                return null;
              },
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.trial == false,
              'model.trialperioddays': () => {

                if (this.plan.trial == false) {
                  return 0;
                }
                else {
                  return this.plan.trialperioddays;
                }
              }
            },

          },
        ]
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'amount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Amount',
              required: true,
            },
            validators: {
              amount: (control) => {
                const value = control.value;
                if (value != 0) {
                  return { amount: 'Value cannot be zero' };
                }
                return null;
              },
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.trial == true,
              'model.amount': () => {
                if (  this.plan.trial == true) {
                  return 0;
                }
                else {
                  return this.plan.amount;
                }
              }
            },
          },
          {
            key: 'currency',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'text',

              label: 'Currency',
              required: true,
              minLength: 3,
              maxLength: 3,
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.trial == true,
              'model.currency': () => {
                if (this.plan.trial == true) {
                  return "";
                }
                else {
                  return this.plan.currency;
                }
              }
            },
          },
          {
            key: 'periodmonths',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              label: 'Validity - Months',
              required: true,
              readonly : true,

            },
            validators: {
              periodmonths: (control) => {
                const value = control.value;
                if (value != 0) {
                  return { periodmonths: 'Value cannot be zero' };
                }
                return null;
              },
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.trial == true,
              'model.priodmonths': () => {
                if (this.plan.trial == true) {
                  return "0";
                }
                else {
                  return this.plan.periodmonths;
                }
              }
            },

          },

        ]
      },
      {
        template: '<br/ >',
      },

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'expirationmethod',
            type: 'select',

            className: 'col-3',
            templateOptions: {
              label: 'Expiration Method',
              placeholder: '------------',
              required: true,

              options: this.getExpirationMethodelookup(),


            },
            expressionProperties: {
              'templateOptions.disabled': model => model.trial == true,
              'model.expirationmethod': () => {
                if (this.plan.trial == true) {
                  return "2";
                }
                else {
                  return this.plan.expirationmethod;
                }
              }
            },


          }
        ]
      },
      {
        template: '<br/ >',
      },

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'lic_type',
            type: 'radio',
            templateOptions: {
              type: 'radio',
              label: 'License Type',
              required: true,
              //  name: 'gender',
              options: [{ label: 'Setup', value: '1' }, { label: 'Runtime', value: '2' }],

              //  change: (field, $event) => this.updateLicense()// console.warn(field, $event),
            },
            // expressionProperties: {
            //   'templateOptions.disabled': model => model.licenseid != 0
            // }

          }
        ]
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'plantypedefault',
            type: 'select',
            className: 'col-3',
            templateOptions: {
              label: 'Default Plan Type ',
              placeholder: '------------',
              //    options: this.getplantypedefaultlookup(),
              options: this.defaultplantypeservice.getLookup(),
              valueProp: 'defaultplantypeid',
              labelProp: 'name',
            },

          },
        ]
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'lic_online',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'online',
            }
          },
          {
            key: 'lic_offline',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'offline',
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'lic_fields_anywhere',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'fields_anywhere',
            }
          },
          {
            key: 'lic_fields_templates',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'fields_templates',
            }
          },
          {
            key: 'lic_classify',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'classify',
            }
          },
          {
            key: 'lic_templates',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'templates',
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'lic_machineprint',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'machineprint',
            }
          },
          {
            key: 'lic_handprint',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'handprint',
            }
          },
          {
            key: 'lic_barcode',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'barcode',
            }
          },
          {
            key: 'lic_omr',
            type: 'checkbox',
            className: 'col-3',
            templateOptions: {
              label: 'Enterprise',

            }
          }
        ]
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'maxpages',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              //  readonly: true,
              label: 'Max pages'
            }
          },
          {
            key: 'maxfields',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              //  readonly: true,
              label: 'Max fields'
            }
          },
        ]
      },
      {
        template: '<br/ >',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'maxpagesforpdfcreation',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              //    readonly: true,
              label: 'Max Pages For Pdf Creation'
            }
          },
          {
            key: 'maxcaptureinstances',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              //     readonly: true,
              label: 'Max Capture Instances'
            }
          },
          {
            key: 'maxocrinstances',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              //    readonly: true,
              label: 'Max Ocr Instances'
            }
          }


        ]
      },
      {
        template: '<br/ >',
      }

    ]
  }


  ngOnInit(): void {

    if (!this.isAccountUser()) {
      this.router.navigate(['/']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.ExpirationMethodLookupList = [
      {
        value: "1",
        label: 'Date Of Payment'
      },
      {
        value: "2",
        label: 'Date Of Activation'
      },
    ]

    this.PlanTypeDefaultLookupList = [
      {
        value: "1",
        label: 'Setup Trial'
      },
      {
        value: "2",
        label: 'Runtime Trial'
      },
      {
        value: "3",
        label: 'Setup Purchase'
      },
      {
        value: "4",
        label: 'Runtime Purchase'
      }
    ];


    // console.log(this.ExpirationMethodLookupList);

    // this.fields = this.loadForms();

    let planid = this.route.snapshot.paramMap.get('id');

    if (planid == '0') {   // new record

      this.buttonText = "Create";
       this.plan =  {} as iPlan
       this.plan.planid = 0;

      // this.plan = {
      //   planid: 0,
      //   description: '',
      //   amount: 0,
      //   recurringmonths: 0,
      //   trial: false

      // }

      this.plan.lic_online = true;
      this.plan.lic_offline = false;
      this.plan.lic_setup = true;
      this.plan.lic_runtime = false;
      this.plan.lic_classify = true;
      this.plan.lic_templates = true;
      this.plan.lic_fields_anywhere = true;
      this.plan.lic_fields_templates = false;
      this.plan.lic_machineprint = true;
      this.plan.lic_handprint = false;
      this.plan.lic_barcode = true;
      this.plan.lic_omr = false;


      this.plan.periodmonths =12;   // currently  constant read only to support multiple years in purchase license screen 

      this.fields = this.loadForms();     


    }
    else {
      this.buttonText = "Update";
      this.planservice.get(planid)
        .subscribe(
          response => {
            this.plan = <iPlan>response;

            if (this.plan.planid == null) {
              this.router.navigate(['/home']);
            }

            this.plan = decodeLicFeatures(this.plan, this.plan.featureslist);

            if (this.plan.lic_setup == true) {
              this.plan.lic_type = "1";
            }
            if (this.plan.lic_runtime == true) {
              this.plan.lic_type = "2";
            }

            this.fields = this.loadForms();         


          },
          _error => {
            console.log('error');
          })
    }

    
   
    // this.fields = this.loadForms();

  }


  getplantypedefaultlookup(): Observable<any[]> {
    return of(this.PlanTypeDefaultLookupList);
  }


  getExpirationMethodelookup(): Observable<any[]> {
    // console.log(this.ExpirationMethodLookupList);
    return of(this.ExpirationMethodLookupList);

  }
  // decodeLicFeatures() {

  //   const getSelections = (items, selection) =>
  //     items.filter((_, i) => selection & (1 << i));

  //   const bitwiseLabels =
  //     ['lic_online', 'lic_offline', 'lic_setup', 'lic_runtime', 'lic_classify',
  //       'lic_templates', 'lic_fields_anywhere', 'lic_fields_templates',
  //       'lic_machineprint', 'lic_handprint', 'lic_barcode', 'lic_omr'];
  //   let selected = getSelections(bitwiseLabels, this.plan.featureslist);
  //   console.log(this.plan);
  //   // console.log(selected);

  //   this.plan.lic_online = selected.includes('lic_online') ? true : false;
  //   this.plan.lic_offline = selected.includes('lic_offline') ? true : false;
  //   this.plan.lic_setup = selected.includes('lic_setup') ? true : false;
  //   this.plan.lic_runtime = selected.includes('lic_runtime') ? true : false;
  //   this.plan.lic_classify = selected.includes('lic_classify') ? true : false;
  //   this.plan.lic_templates = selected.includes('lic_templates') ? true : false;
  //   this.plan.lic_fields_anywhere = selected.includes('lic_fields_anywhere') ? true : false;
  //   this.plan.lic_fields_templates = selected.includes('lic_fields_templates') ? true : false;
  //   this.plan.lic_machineprint = selected.includes('lic_machineprint') ? true : false;
  //   this.plan.lic_handprint = selected.includes('lic_handprint') ? true : false;
  //   this.plan.lic_barcode = selected.includes('lic_barcode') ? true : false;
  //   this.plan.lic_omr = selected.includes('lic_omr') ? true : false;

  // }


  encodeLicFeatures() {
    let features = 0;
    if (this.plan.lic_online) {
     
      features += 1;
    }
    if (this.plan.lic_offline) {
    
      features += 2;
    }
    if (this.plan.lic_setup) {
      //  console.log("plan.lic_setup");
      features += 4;
    }
    if (this.plan.lic_runtime) {
      //  console.log("plan.lic_runtime");
      features += 8;
    }
    if (this.plan.lic_classify) {
      //   console.log("plan.lic_classify");
      features += 16;
    }
    if (this.plan.lic_templates) {
      features += 32;
      //  console.log("plan.lic_templates");
    }
    if (this.plan.lic_fields_anywhere) {
      //   console.log("plan.lic_fields_anywhere");
      features += 64;
    }
    if (this.plan.lic_fields_templates) {
      //   console.log("plan.lic_fields_templates");
      features += 128;
    }
    if (this.plan.lic_machineprint) {
      //   console.log("plan.lic_machineprint");
      features += 256;
    }
    if (this.plan.lic_handprint) {
      //   console.log("plan.lic_handprint");
      features += 512;
    }
    if (this.plan.lic_barcode) {
      //   console.log("plan.lic_barcode");
      features += 1024;
    }
    if (this.plan.lic_omr) {
      //   console.log("plan.lic_omr");
      features += 2048;
    }
    //  console.log(features);
    this.plan.featureslist = features;

  }

  submit() {

    console.log(this.plan);

    if (this.plan.lic_type == "1") {
      this.plan.lic_runtime = false;
      this.plan.lic_setup = true;
      this.plan.licensetype = "Setup";
    }
    if (this.plan.lic_type == "2") {
      this.plan.lic_runtime = true;
      this.plan.lic_setup = false;
      this.plan.licensetype = "Runtime";
    }


    this.encodeLicFeatures();



    if (this.plan.planid == 0) {
      console.log("new");
      this.planservice.create(this.plan)
        .subscribe(response => {
          console.log(this.returnUrl);
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

      this.planservice.update(this.plan)
        .subscribe(response => {
          console.log(this.returnUrl);
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

  isAccountUser(): boolean {
    return (this.currentUser.usertype == userTypes.AccountUser || this.currentUser.usertype == userTypes.AccountManager || this.currentUser.usertype == userTypes.Admin);
  
  }

}
