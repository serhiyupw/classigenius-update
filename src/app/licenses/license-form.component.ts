import { ConfirmDialogComponent } from './../_helpers/confirm-dialog/confirm-dialog.component';
import { LicensepaymentService } from './../_services/licensepayment.service';
import { PlanService } from './../_services/plan.service';
import { iOrder } from './../payment/order';
import { OrderService } from './../_services/order.service';
import { ProjectService } from './../_services/project.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormlyConfig, FormlyField, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { IntegratorService } from '../_services/integrator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseService } from '../_services/license.service';
import { iLicense } from './license';
import { switchMap, startWith } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { iUser } from '../users/iUser';
import { AuthenticationService } from '../_services/authentication.service';
import { iPlan } from '../plans/plan';
import { iLicensePayment } from './licensepayment';
import { ConfirmMessageComponent } from '../_helpers/confirm-message/confirm-message.component';
import { iIntegrator } from '../integrators/iIntegrator';
import { iProject } from '../projects/project';
import { userTypes } from '../_common/constants';



export interface iCreateResponse {
  orderid: number,
  licenseid: number,
  licensekey: string,

}

@Component({
  selector: 'license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss']
})
export class LicenseFormComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private licenseService: LicenseService,
    private integratorService: IntegratorService,
    private licensepaymentService: LicensepaymentService,
    private orderService: OrderService,
    private projectService: ProjectService,
    private planService: PlanService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmMessage: ConfirmMessageComponent,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: iUser;
  buttonText: string;
  license: Partial<iLicense> = { paid: false };

  integrators: iIntegrator[];
  integrator: iIntegrator;

  projects: iProject[];
  project : iProject;

  selectedPlan: Partial<iPlan> = {}
  licensePayment: iLicensePayment;

  createResponse: iCreateResponse;

  orders: iOrder[];
  form = new FormGroup({})
  fields: FormlyFieldConfig[];



  loadForms(): FormlyFieldConfig[] {
    return [

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'accountid',
            type: 'select',
            className: 'col-3',

            templateOptions: {
              label: 'account',
              placeholder: '------------',
              required: true,
              options: this.accountService.getLookup(),
              valueProp: 'accountid',
              labelProp: 'companyname',
            },
            hideExpression: hidden => !this.isAdminUser(),
            // hooks: {
            //   afterContentInit: (field: FormlyFieldConfig) => {
            //     field.defaultValue = '1'
            //   },
            //   afterViewInit: (field: FormlyFieldConfig) => {
            //     field.defaultValue = '1'
            //   },
            //    }
          },
        ]
      },

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'integratorid',
            type: 'select',
            //  className: 'flex-3',
            className: 'col-3',
            templateOptions: {
              label: 'Integrator',
              placeholder: '------------',
              required: true,
              //   options: this.integratorService.getLookup("accountid", this.license.accountid),
              options: this.integratorService.getLookup(),

              valueProp: 'integratorid',
              labelProp: 'companyname',

            },
            expressionProperties: {

              'templateOptions.disabled': model => model.licenseid > 0
            },
            // hooks: {
            //   onInit: (field: FormlyFieldConfig) => {
            //     field.templateOptions.options = field.form
            //       .get('accountid')
            //       .valueChanges.pipe(
            //         //   startWith(this.license.integratorid),
            //         switchMap(accountid => {
            //           return this.integratorService.getLookup("accountid", accountid);
            //         })
            //       );
            //   }
            // }
          },
          {
            key: 'projectid',
            type: 'select',
            // className: 'flex-3',
            className: 'col-3',
            templateOptions: {
              label: 'Project',
              placeholder: '------------',
              required: true,

              options: this.projectService.getLookup("integratorid", this.license.integratorid),

              valueProp: 'projectid',
              labelProp: 'name',
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.templateOptions.options = field.form
                  .get('integratorid')
                  .valueChanges.pipe(
                    startWith(this.license.integratorid),
                    switchMap(integratorid => this.projectService.getLookup("integratorid", integratorid))
                  );
              }

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
            key: 'planid',
            type: 'select',

            className: 'col-5',
            templateOptions: {
              label: 'Plan',
              placeholder: '------------',
              required: true,
              //   options: this.integratorService.getLookup("accountid", this.license.accountid),
              options: this.planService.getLookup(),

              valueProp: 'planid',
              labelProp: 'description',

              change: (field, $event) => {
                let planid = this.form.get('planid').value;
                this.planService.get(planid)
                  .subscribe(
                    response => {
                      this.selectedPlan = <iPlan>response;
                      this.decodeLicFeatures(this.selectedPlan.featureslist);
                      this.license.maxpages = this.selectedPlan.maxpages;
                      this.license.maxcaptureinstances = this.selectedPlan.maxcaptureinstances;
                      this.license.maxfields = this.selectedPlan.maxfields;
                      this.license.maxocrinstances = this.selectedPlan.maxocrinstances;
                      this.license.maxpagesforpdfcreation = this.selectedPlan.maxpagesforpdfcreation;
                      this.license.periodmonths = this.selectedPlan.periodmonths;
                      this.license.trialperioddays = this.selectedPlan.trialperioddays;
                      this.license.trial = this.selectedPlan.trial;
                      //    console.log("plan: "+this.selectedPlan.maxcaptureinstances);
                    },
                    _error => {
                      console.log('error');
                    }
                  )

              },
            },
            expressionProperties: {
            
              'templateOptions.disabled': model => model.licenseid > 0
            },

          },
          {
            key: 'trial',
            type: 'checkbox',
            className: 'flex-3',

            templateOptions: {
              label: 'Trial',
              disabled: true,
            },
            // validators: {
            //   atLeastOneFieldRequired: {
            //     expression: (fieldArray: FormlyFieldConfig[]) => {
            //       return fieldArray.some((field) => !!field.formControl.value);
            //     },
            //     message: 'At least one field in this group is required.',
            //   },
            // },
            expressionProperties: {
              //    'templateOptions.disabled': model => model.licenseid != 0
              // 'templateOptions.disabled': model => true,
              'model.trial': () => {
                return this.license.trial;
              }
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
            key: 'environment',
            type: 'input',
            className: 'col-5',
            templateOptions: {
              type: 'text',
              label: 'Environment/Server/Desktop',
              maxLength: 50,
            }
          },

        ]
      },

      {
        template: '<br/ >',
      },
      {
        key: 'comments',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Comments',
          maxLength: 100,
        }
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

              change: (field, $event) => this.updateLicense()// console.warn(field, $event),
            },
            expressionProperties: {
              //    'templateOptions.disabled': model => model.licenseid != 0,
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_type': () => {
                return this.license.lic_type;
              }

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
            key: 'lic_online',
            type: 'checkbox',
            className: 'col-2',

            templateOptions: {
              label: 'online',

            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_online': () => {
                return this.license.lic_online;
              }
            }

          },
          {
            key: 'lic_offline',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'offline',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_offline': () => {
                return this.license.lic_offline;
              }
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
            className: 'col-2',
            templateOptions: {
              label: 'fields_anywhere',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_fields_anywhere': () => {
                return this.license.lic_fields_anywhere;
              }
            }
          },
          {
            key: 'lic_fields_templates',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'fields_templates',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_fields_templates': () => {
                return this.license.lic_fields_templates;
              }
            }
          },
          {
            key: 'lic_classify',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'classify',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_classify': () => {
                return this.license.lic_classify;
              }
            }
          },
          {
            key: 'lic_templates',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'templates',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_templates': () => {
                return this.license.lic_templates
              }
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
            className: 'col-2',
            templateOptions: {
              label: 'machineprint',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_machineprint': () => {
                return this.license.lic_machineprint
              }
            }
          },
          {
            key: 'lic_handprint',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'handprint',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_handprint': () => {
                return this.license.lic_handprint
              }
            }
          },
          {
            key: 'lic_barcode',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'barcode',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_barcode': () => {
                return this.license.lic_barcode
              }
            }
          },
          {
            key: 'lic_omr',
            type: 'checkbox',
            className: 'col-2',
            templateOptions: {
              label: 'Enterprise',

            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
              'model.lic_omr': () => {
                return this.license.lic_omr
              }
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
              className: 'col-2',
            templateOptions: {
              type: 'number',
              //  readonly: true,
              readonly: !this.isAdminUser(),
              label: 'Max pages'
            },

            expressionProperties: {
              'model.maxpages': () => {
                return this.license.maxpages;
              }
            }

          },

          {
            key: 'maxfields',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: !this.isAdminUser(),
              label: 'Max fields'
            },
            expressionProperties: {
              'model.maxfields': () => {
                return this.license.maxfields;
              }
            }
          },
          {
            key: 'maxpagesforpdfcreation',
            type: 'input',
             className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: !this.isAdminUser(),
              label: 'Max Pages For Pdf Creation'
            },
            expressionProperties: {
              'model.maxpagesforpdfcreation': () => {
                return this.license.maxpagesforpdfcreation;
              }
            }
          },
          {
            key: 'maxcaptureinstances',
            type: 'input',
             className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: !this.isAdminUser(),
              label: 'Max Capture Instances'
            },
            expressionProperties: {
              'model.maxcaptureinstances': () => {
                return this.license.maxcaptureinstances;
              }
            }
          },
          {
            key: 'maxocrinstances',
            type: 'input',
             className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: !this.isAdminUser(),
              label: 'Max Ocr Instances'
            },
            expressionProperties: {
              'model.maxocrinstances': () => {
                return this.license.maxocrinstances;
              }
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
            key: 'periodmonths',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Validity - Months',
              readonly: !this.isAdminUser(),
            },
            expressionProperties: {
              'model.periodmonths': () => {
                return this.license.periodmonths;
              }
            }
          },
          {
            key: 'trialperioddays',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Trial Period - Days',
              readonly: !this.isAdminUser(),
            },
            expressionProperties: {
              'model.trialperioddays': () => {
                return this.license.trialperioddays;
              }
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
            key: 'licensekey',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'text',
              readonly: true,
              label: 'License Key'
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
            key: 'stationcodeactivated',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'text',
              readonly: true,
              label: 'Activated Station Code'
            }
          },
          {
            key: 'activationdatetime',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'text',
              readonly: true,
              label: 'Activation Date/Time'
            }
          },
          {
            key: 'expirationdate',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'date',
              //   readonly: true,
              label: 'Expiration Date'
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
            }
          },
          // {
          //   key: 'defaultexpirationdays',
          //   type: 'input',
          //   templateOptions: {
          //     type: 'text',

          //     label: 'Default Expiration Days'
          //   }
          // },
          {
            key: 'active',
            type: 'checkbox',
            className: 'col-1',
            templateOptions: {
              label: 'Active',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
            }
          },
          {
            key: 'paid',
            type: 'checkbox',
            className: 'col-1',
            templateOptions: {
              label: 'Paid',
            },
            expressionProperties: {
              'templateOptions.disabled': model => !this.isAdminUser(),
            }
          },
        ]
      },

      {
        template: '<br/ >',
      },

    ]
  }


  ngOnInit(): void {

    this.buttonText = 'Update';
    let licenseid = this.route.snapshot.paramMap.get('id');
    let plantypedefault = this.route.snapshot.paramMap.get('plantypedefault');

    console.log("plantypedefault: " + plantypedefault);

    if (licenseid == '0') {   // new record

      this.buttonText = "Create";
      this.license = {} as iLicense;
      this.license.licenseid = 0;
      this.license.defaultexpirationdays = 0;

      if (plantypedefault != '0' && plantypedefault != null) {
        this.setLicensePropertiesbasedOnPlanDefault(plantypedefault);
      }
      else {
        this.fields = this.loadForms();
      }


    }
    else {
      this.licenseService.get(licenseid)
        .subscribe(
          response => {

            this.license = <iLicense>response;

            if (this.license.licenseid == null) {
              this.router.navigate(['/home']);
            }

            this.decodeLicFeatures(this.license.featureslist);


            let planid = this.license.planid;
            this.planService.get(planid)
              .subscribe(
                response => {
                  this.selectedPlan = <iPlan>response;
                  //    console.log("plan: "+this.selectedPlan.maxcaptureinstances);
                },
                _error => {
                  console.log('error');
                }
              )

            this.fields = this.loadForms();
            //     console.log(this.license);
          },
          _error => {
            console.log('error');
          })
    }

  }

  setLicensePropertiesbasedOnPlanDefault(plantypedefault: string) {
    {
      //  let planid = this.form.get('planid').value;
      this.planService.getByPlanTypeDefault(plantypedefault)
        .subscribe(
          response => {
            this.selectedPlan = <iPlan>response;

            this.license.planid = this.selectedPlan.planid;

            this.decodeLicFeatures(this.selectedPlan.featureslist);
            this.license.maxpages = this.selectedPlan.maxpages;
            this.license.maxcaptureinstances = this.selectedPlan.maxcaptureinstances;
            this.license.maxfields = this.selectedPlan.maxfields;
            this.license.maxocrinstances = this.selectedPlan.maxocrinstances;
            this.license.maxpagesforpdfcreation = this.selectedPlan.maxpagesforpdfcreation;
            this.license.periodmonths = this.selectedPlan.periodmonths;
            this.license.trial = this.selectedPlan.trial;

            this.integratorService.getAll()
              .subscribe(
                response => {
                  this.integrators = <iIntegrator[]>response;

                  // check if integrators found
                  if (this.integrators.length > 0) {
                   // get the first integrator
                      this.license.integratorid = this.integrators[0].integratorid;

                  }

                    this.projectService.getAll()
                    .subscribe(
                      response=> {
                        this.projects = <iProject[]>response;
                        if (this.projects.length > 0) {
                          this.license.projectid = this.projects[0].projectid;
                        }
                        this.fields = this.loadForms();
                      }
                    )

                }
              )

          })
    }
  }




  isAdminUser(): Boolean {
    // console.log(this.currentUser);
    // let isadmin = false;
    if (this.currentUser == null)
      return false;

    return (this.currentUser.usertype == userTypes.Admin );
    // return ( this.currentUser== null ||  this.currentUser.usertype == 5);
  }

  updateLicense() {

  }


  encodeLicFeatures() {
    let features = 0;
    if (this.license.lic_online) {
      //  console.log("license.lic_online");
      features += 1;
    }
    if (this.license.lic_offline) {
      //  console.log("license.lic_offline");
      features += 2;
    }
    if (this.license.lic_setup) {
      //  console.log("license.lic_setup");
      features += 4;
    }
    if (this.license.lic_runtime) {
      //  console.log("license.lic_runtime");
      features += 8;
    }
    if (this.license.lic_classify) {
      //   console.log("license.lic_classify");
      features += 16;
    }
    if (this.license.lic_templates) {
      features += 32;
      //  console.log("license.lic_templates");
    }
    if (this.license.lic_fields_anywhere) {
      //   console.log("license.lic_fields_anywhere");
      features += 64;
    }
    if (this.license.lic_fields_templates) {
      //   console.log("license.lic_fields_templates");
      features += 128;
    }
    if (this.license.lic_machineprint) {
      //   console.log("license.lic_machineprint");
      features += 256;
    }
    if (this.license.lic_handprint) {
      //   console.log("license.lic_handprint");
      features += 512;
    }
    if (this.license.lic_barcode) {
      //   console.log("license.lic_barcode");
      features += 1024;
    }
    if (this.license.lic_omr) {
      //   console.log("license.lic_omr");
      features += 2048;
    }
    //  console.log(features);
    this.license.featureslist = features;

  }

  decodeLicFeatures(featureslist) {

    const getSelections = (items, selection) =>
      items.filter((_, i) => selection & (1 << i));

    const bitwiseLabels =
      ['lic_online', 'lic_offline', 'lic_setup', 'lic_runtime', 'lic_classify',
        'lic_templates', 'lic_fields_anywhere', 'lic_fields_templates',
        'lic_machineprint', 'lic_handprint', 'lic_barcode', 'lic_omr'];
   
    let selected = getSelections(bitwiseLabels, featureslist);
   
    this.license.lic_online = selected.includes('lic_online') ? true : false;
    this.license.lic_offline = selected.includes('lic_offline') ? true : false;
    this.license.lic_setup = selected.includes('lic_setup') ? true : false;
    this.license.lic_runtime = selected.includes('lic_runtime') ? true : false;
    this.license.lic_classify = selected.includes('lic_classify') ? true : false;
    this.license.lic_templates = selected.includes('lic_templates') ? true : false;
    this.license.lic_fields_anywhere = selected.includes('lic_fields_anywhere') ? true : false;
    this.license.lic_fields_templates = selected.includes('lic_fields_templates') ? true : false;
    this.license.lic_machineprint = selected.includes('lic_machineprint') ? true : false;
    this.license.lic_handprint = selected.includes('lic_handprint') ? true : false;
    this.license.lic_barcode = selected.includes('lic_barcode') ? true : false;
    this.license.lic_omr = selected.includes('lic_omr') ? true : false;

    if (this.license.lic_setup == true) {
      this.license.lic_type = "1";
    }
    if (this.license.lic_runtime == true) {
      this.license.lic_type = "2";
    }

  }

  PayLicense() {
    this.orderService.getLookup("licenseid", this.license.licenseid)
      .subscribe(response => {

        this.orders = <iOrder[]>response;
        let orderid = this.orders[0].orderid;
        this.router.navigate(['/paypal', orderid]);
        // this.router.navigate(['/tranzila', orderid]);

      })
    _error => {
      console.log('error');
      this.form.setErrors({
        invalid: true
      });
    }
  }


  updateLicnese(): boolean {
    this.licenseService.update(this.license)
      .subscribe(response => {
        console.log(response);
        return true;
      })
    _error => {
      console.log('error');
      this.form.setErrors({
        invalid: true
      });
      return false;
    };

    return true;

  }

  AddToCart(updateLicense: boolean, routeToCheckout: boolean) {

    let updatelicenseOk = true;
    if (updateLicense) {
      updatelicenseOk = this.updateLicnese();
    }

    if (updatelicenseOk) {

      console.log(this.license);

      this.licensePayment = {} as iLicensePayment;
      this.licensePayment.licenseid = this.license.licenseid;
      this.licensePayment.months = this.selectedPlan.periodmonths;
      this.licensePayment.amount = this.selectedPlan.amount;
      this.licensePayment.currency = this.selectedPlan.currency;
      this.licensePayment.expirationmethod = this.selectedPlan.expirationmethod;
      this.licensePayment.userid = this.currentUser.userid;


      console.log(this.licensePayment);
      this.licensepaymentService.createupdate(this.licensePayment)

        .subscribe(response => {
          console.log(response);
          if (routeToCheckout) {
            this.router.navigate(['/checkout']);
          }
          else {
            this.confirmMessage.displayConfirmationMessege('License added to cart');
          }
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }

  }

  showPayButton() {

    if (this.license.trial == true)
      return false;
    if (this.license.paid == false && this.license.licenseid > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  showExtendButton() {

    if (this.license.paid == true) {

      return true;
    }
    else {
      return false;
    }
  }

  onSubmit({ valid, value }) {

    console.log(this.license.lic_type);
    if (this.license.lic_type == "1") {
      this.license.lic_runtime = false;
      this.license.lic_setup = true;
    }
    if (this.license.lic_type == "2") {
      this.license.lic_runtime = true;
      this.license.lic_setup = false;
    }


    this.encodeLicFeatures();

    if (this.license.licenseid == 0) {

      // console.log("new license");

      // this.license.paid = this.license.trial;
      // if (this.license.trial == false)   // temporary fixed price
      // {
      //   this.license.totalamount = 10;
      // }
      // else {
      //   this.license.totalamount = 0;
      // }
      this.license.totalamount = this.selectedPlan.amount;

      this.licenseService.create(this.license)
        .subscribe(response => {
          if (this.license.paid == true || this.license.trial == true) {
            this.router.navigate(['/licenses']);
          }
          else {
            this.createResponse = <iCreateResponse>response;
            console.log(this.createResponse.licensekey);
            this.license.licenseid = this.createResponse.licenseid;
            this.AddToCart(false, true);

            //  this.router.navigate(['/checkout']);
          }
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid: true
        });
      }
    }
    else {
      // console.log("existing license");
      // console.log(this.license);
      this.licenseService.update(this.license)
        .subscribe(response => {
          this.router.navigate(['/licenses']);
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


