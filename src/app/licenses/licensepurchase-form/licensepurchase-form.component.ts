import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LicenseService } from 'src/app/_services/license.service';
import { iUser } from 'src/app/users/iUser';
import { iLicense, iLicensePurchase } from '../license';
import { PlanService } from 'src/app/_services/plan.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iPlan } from 'src/app/plans/plan';
import { LicensepaymentService } from 'src/app/_services/licensepayment.service';
import { iLicensePayment } from '../licensepayment';
import { ConfirmMessageComponent } from 'src/app/_helpers/confirm-message/confirm-message.component';
import { ProjectService } from 'src/app/_services/project.service';
import { GlobalsService } from 'src/app/_services/globals.service';
import { iGlobals } from 'src/app/globals/globals';

@Component({
  selector: 'app-licensepurchase-form',
  templateUrl: './licensepurchase-form.component.html',
  styleUrls: ['./licensepurchase-form.component.scss']
})
export class LicensepurchaseFormComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private licenseService: LicenseService,
    private planService: PlanService,
    private licensepaymentService: LicensepaymentService,
    private project: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmMessage: ConfirmMessageComponent,
    private globalsService: GlobalsService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: iUser;
  // license: Partial<iLicense> = { paid: false };
  licensePurchase: Partial<iLicensePurchase>;

  form = new FormGroup({})
  fields: FormlyFieldConfig[];
  selectedPlan: Partial<iPlan> = {}
  PlanTypeLookup: any[] = [];
  ProjectLookup: any[] = [];
  globals: iGlobals;

  ngOnInit(): void {
    // let licenseid = this.route.snapshot.paramMap.get('id');

    //iniaialize license purchase object
    this.licensePurchase = {
      licenseid: 0,
      planid: 0,
      periodmonths: 0,
      amount: 0,
      currency: '',
      projectid: 0,
      licenses: 1,
      totalamount: 0,

    }

    this.licensePurchase.planid = 0;

    this.planService.getLookup("trial", 0)
      .subscribe(
        response => {
          this.PlanTypeLookup = <any[]>response;


          this.project.getLookup()
            .subscribe(
              response => {
                this.ProjectLookup = <any[]>response;
                // set projectid to the first project in the list if there is only one project
                if (this.ProjectLookup.length == 1) {
                  this.licensePurchase.projectid = this.ProjectLookup[0].projectid;
                }
                this.licensePurchase.licenses = 1;
                this.licensePurchase.years = 1;

                this.globalsService.get(1)
                  .subscribe(
                    response => {
                      this.globals = <iGlobals>response;

                      //  console.log(this.globals);
                      this.fields = this.loadForms();
                    }

                  )


              },
              _error => {
                console.log('error');
              })

          //      this.fields = this.loadForms();
        },
        _error => {
          console.log('error');
        }
      )

  }

  loadForms(): FormlyFieldConfig[] {
    return [

      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'planid',
            type: 'select',

            className: 'col-5',
            templateOptions: {
              label: 'Plan',
              placeholder: '------------',
              required: true,

              options: this.PlanTypeLookup,   // get all non trial plans

              valueProp: 'planid',
              labelProp: 'description',

              change: (field, $event) => {
                let planid = this.form.get('planid').value;
                this.planService.get(planid)
                  .subscribe(
                    response => {
                      this.selectedPlan = <iPlan>response;
                      this.licensePurchase.periodmonths = this.selectedPlan.periodmonths;
                      this.licensePurchase.amount = this.selectedPlan.amount;
                      this.licensePurchase.currency = this.selectedPlan.currency;
                      if (this.licensePurchase.licenses == 0) {
                        this.licensePurchase.licenses = 1;
                      }

                    },
                    _error => {
                      console.log('error');
                    }
                  )

              },
            },
          },

          {
            key: 'amount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Amount',
              readonly: true,
            },

            expressionProperties: {
              'model.amount': () => {
                return this.licensePurchase.amount;
              }
            }
          },
          {
            key: 'currency',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'text',

              label: 'Currency',
              readonly: true,

            },
            expressionProperties: {
              'model.currency': () => {
                return this.licensePurchase.currency;
              }

            },
          }
        ]
      },
      {
        template: '<br/ >',
      },

      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'licenses',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Licenses',
              required: true,

            },
            validators: {
              quantityNotZero: {
                expression: (c) => c.value !== 0, // Validation logic: Quantity should not be 0
                message: 'Number of licenses cannot be 0', // Validation error message
              },
            },

            expressionProperties: {
              'model.licenses': () => {
                return this.licensePurchase.licenses;
              }
            }
          },


        ]
      },
      {
        template: '<br/ >',
      },

      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'years',
            type: 'input',
            className: 'col-8',
            templateOptions: {
              type: 'number',
              label: 'Years -  ' + this.DiscountsLabel(),
              required: true,

            },
            validators: {
              quantityNotZero: {
                expression: (c) => c.value !== 0, // Validation logic: Quantity should not be 0
                message: 'Number of licenses cannot be 0', // Validation error message
              },
            },

            expressionProperties: {
              'model.years': () => {
                return this.licensePurchase.years;
              }
            }
          },


        ]
      },
      {
        template: '<br/ >'

      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'totalamount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              label: 'Total Amount',
              readonly: true,

            },

            expressionProperties: {
              'templateOptions.disabled': 'formState.disableTotalField',
              'model.totalamount': (model, formState) => {
                if (!formState.disableTotalField) {

                  let pricePerYear = model.amount * (model.periodmonths / 12);
                  // console.log(model.amount);
                  // console.log(model.periodmonths);
                  // console.log(pricePerYear);
              

                  let totalPriceBeforeDiscount = pricePerYear * model.licenses * model.years
                  console.log("pricePerYear: " + pricePerYear + " licenses: " + model.licenses + " years: " + model.years + " totalPriceBeforeDiscount: " + totalPriceBeforeDiscount);

                  let totalPrice = totalPriceBeforeDiscount;
                  if (this.globals.discount2years > 0 && model.years == 2) {
                    totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount2years / 100));
                  }
                  if (this.globals.discount3years > 0 && model.years == 3) {
                    totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount3years / 100));
                  }
                  if (this.globals.discount4years > 0 && model.years >= 4) {
                    totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount4years / 100));
                  }
                  if (this.globals.discount5years > 0 && model.years >= 5) {
                    totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount5years / 100));
                  }

                  // round total price to 2 decimal places
                  totalPrice = Math.round(totalPrice * 100) / 100;


                  return totalPrice || 0;   // Calculate total based on amount, quantity and years assuming that months is 12


                }
                return model.totalamount;
              },
            },
          },


        ]
      },
      {
        template: '<br/ >',
      },
      {

        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'projectid',
            type: 'select',

            className: 'col-5',
            templateOptions: {
              label: 'Project',
              placeholder: '------------',
              required: true,

              options: this.ProjectLookup,   // get all projects

              valueProp: 'projectid',
              labelProp: 'name',

            },
          }
        ]

      }

    ]

  }


  AddToCart() {

    // console.log(this.licensePurchase);
    this.licenseService.generatenewlicensebasedonplan(this.licensePurchase)
      .subscribe(
        Response => {

          this.router.navigate(['/checkout']);

        },
        _error => {
          console.log('error');
        }

      )

  }

  onSubmit() { }


  DiscountsLabel() {
    let label = "Discounts: 2 years: " + this.globals.discount2years + "%, 3 years: " + this.globals.discount3years + "%, 4 years or more: " + this.globals.discount4years + "%";

    return label;

  }

}
