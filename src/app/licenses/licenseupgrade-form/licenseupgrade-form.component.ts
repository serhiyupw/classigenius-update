import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LicenseService } from 'src/app/_services/license.service';
import { iUser } from 'src/app/users/iUser';
import { iLicense, iLicensePurchase, iMultiLicensePurchaseResponse } from '../license';
import { PlanService } from 'src/app/_services/plan.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iPlan } from 'src/app/plans/plan';
import { LicensepaymentService } from 'src/app/_services/licensepayment.service';
import { iLicensePayment } from '../licensepayment';
import { ConfirmMessageComponent } from 'src/app/_helpers/confirm-message/confirm-message.component';
import { iGlobals } from 'src/app/globals/globals';
import { GlobalsService } from 'src/app/_services/globals.service';

@Component({
  selector: 'app-licenseupgrade-form',
  templateUrl: './licenseupgrade-form.component.html',
  styleUrls: ['./licenseupgrade-form.component.scss']
})
export class LicenseupgradeFormComponent implements OnInit {

  constructor(

    private authenticationService: AuthenticationService,
    private licenseService: LicenseService,
    private planService: PlanService,
    private licensepaymentService: LicensepaymentService,
    private globalsService: GlobalsService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmMessage: ConfirmMessageComponent,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  currentUser: iUser;
  license: Partial<iLicense> = { paid: false };
  licensePurchase: Partial<iLicensePurchase>;

  form = new FormGroup({})
  fields: FormlyFieldConfig[];
  selectedPlan: Partial<iPlan> = {}
  PlanTypeLookup: any[] = [];
  plans: iPlan[] = [];
  globals: iGlobals;
  planidReadOnly = false;

  ngOnInit(): void {
    let licenseid = this.route.snapshot.paramMap.get('id');

    //iniaialize license purchase object
    this.licensePurchase = {
      licenseid: 0,
      planid: 0,
      periodmonths: 0,
      amount: 0,
      currency: '',

    }

    this.globalsService.get(1)
      .subscribe(
        response => {
          this.globals = <iGlobals>response;

        }

      )
    // load plans
    this.planService.getLookup()
      .subscribe(
        response => {
          this.plans = <any[]>response;

        }
      )

    this.licenseService.get(licenseid)
      .subscribe(
        response => {

          this.license = <iLicense>response;

          this.licensePurchase.planid = 0;
          if (this.license.paid == true) {
            this.licensePurchase.planid = this.license.planid;
            this.planidReadOnly = true;

          }
          this.licensePurchase.licenseid = this.license.licenseid;
          this.licensePurchase.licensekey = this.license.licensekey;
          this.licensePurchase.currentyears = this.license.periodmonths / 12;
          this.licensePurchase.currency = "USD";    // default currency is USD

          this.planService.getLookup("trial", 0)
            .subscribe(
              response => {
                this.PlanTypeLookup = <any[]>response;


                this.PlanTypeLookup = this.PlanTypeLookup.filter(x => x.licensetype == this.license.licensetype);
                // console.log(this.licensePurchase.planid);
                this.fields = this.loadForms();
              },
              _error => {
                console.log('error');
              }
            )

        },
        _error => {
          console.log('error');
        })

  }

  loadForms(): FormlyFieldConfig[] {
    return [

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'licensekey',
            type: 'input',
            className: 'col-5',
            templateOptions: {
              type: 'text',
              readonly: true,
              label: 'License Key'
            }
          }
        ]
      },

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'planid',
            type: 'select',

            className: 'col-7',
            templateOptions: {
              label: 'Plan',
              placeholder: '------------',
              //     readonly : this.planidReadOnly,
              readonly: true,
              required: true,

              // options: this.planService.getLookup("trial", 0),   // get all non trial plans
              options: this.PlanTypeLookup,   // get all non trial plans

              valueProp: 'planid',
              labelProp: 'description',

              change: (field, $event) => {

                let planid = field.formControl.value;
                //  console.log(planid);

                // check if planid is not null
                if (planid != null) {

                  this.planService.get(planid)
                    .subscribe(
                      response => {
                        this.selectedPlan = <iPlan>response;
                        //    console.log(this.selectedPlan);
                        this.licensePurchase.periodmonths = this.selectedPlan.periodmonths;
                        //      this.licensePurchase.amount = this.selectedPlan.amount;
                        //      this.licensePurchase.currency = this.selectedPlan.currency;

                        // console.log(this.licensePurchase);

                      },
                      _error => {
                        console.log('error');
                      }
                    )
                }
                else // planid is null
                {
                  this.selectedPlan = {} as iPlan;
                  this.licensePurchase.periodmonths = 0;
                  this.licensePurchase.amount = 0;
                  this.licensePurchase.currency = '';
                }

              },
            },
            expressionProperties: {

              'templateOptions.disabled': model => this.planidReadOnly
            },
          },
        ]
      },

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'currentyears',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              label: 'Current Years',

              readonly: true,
            },


          },
          {
            key: 'years',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              label: 'Externd Years',

              required: true,
            },
            validators: {
              max: {
                expression: (c: FormControl) => (c.value <= 5),
                message: 'Must be between 1 and 5',
              },
              min: {
                expression: (c: FormControl) => (c.value >= 1),
                message: 'Must be between 1 and 5',
              }
            }

          }

        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'amount',
            type: 'input',
            className: 'col-3',
            templateOptions: {
              type: 'number',
              label: 'Amount (USD)',
              readonly: true,
              // required: true,
            },

            expressionProperties:
            // {
            // 'model.amount': () => {
            //   if (this.licensePurchase.years != undefined) {
            //     return this.calculatePlanAmount(this.licensePurchase.years, 1, this.licensePurchase.planid);
            //   }
            //  return this.licensePurchase.amount;
            //  }
            // }
            {
              'model.amount': (model: any) => {
                // console.log(model.years);
                if (model.years != undefined) {
                  return this.calculatePlanAmount(model.currentyears, model.years, 1, model.planid, this.license.totalamount);
                }
              },
            }
          },
          // {
          //   key: 'currency',
          //   type: 'input',
          //   className: 'col-2',
          //   templateOptions: {
          //     type: 'text',

          //     label: 'Currency',
          //     readonly: true,

          //   },
          //   expressionProperties: {
          //     'model.currency': () => {
          //       return this.licensePurchase.currency;
          //     }

          //   },
          // }
        ]
      }
    ]


  }



  calculatePlanAmount(currentyears: number, years: number, quantity: number, planid: number, paidamount: number) {

    // console.log(years + '-' + quantity + '-' + planid);
    let plan = this.plans.find(plan => plan.planid == planid);
    if (plan == undefined) {
      return "";
    }

    if (years == undefined || quantity == undefined) {
      return "";
    }

    if (years > 5 || quantity > 20) {
      return "";
    }

    if (years < 1) {
      return "";
    }

    let yearsForDiscountCalculation = years;
    // check if last payment date is less than discount grace period
    let lastPaymentDate = new Date(this.license.lastpaymentdate);
    let gracePeriodDate = this.AddMonthsToDate(lastPaymentDate, this.globals.extendyearsgraceperiod);
    let currentDate = new Date();
    if (currentDate < gracePeriodDate) {
      yearsForDiscountCalculation = currentyears + years;
    }


    let pricePerYear = plan.amount * (plan.periodmonths / 12);
    console.log("pricePerYear:" + pricePerYear + " currentyears:" + currentyears + " years:" + years + " quantity:" + quantity + " planid:" + planid + " paidamount:" + paidamount);

    let totalPriceBeforeDiscount = pricePerYear * quantity * yearsForDiscountCalculation;
     console.log("yearsForDiscountCalculation:" + yearsForDiscountCalculation);

    let discountPrice = 0;
    if (this.globals.discount2years > 0 && yearsForDiscountCalculation == 2) {
      discountPrice =  (totalPriceBeforeDiscount * (this.globals.discount2years / 100));
      console.log("discount2years:" + this.globals.discount2years);
    }
    if (this.globals.discount3years > 0 && yearsForDiscountCalculation == 3) {
      discountPrice =  (totalPriceBeforeDiscount * (this.globals.discount3years / 100));
    }
    if (this.globals.discount4years > 0 && yearsForDiscountCalculation == 4) {
      discountPrice =  (totalPriceBeforeDiscount * (this.globals.discount4years / 100));
    }
    if (this.globals.discount5years > 0 && yearsForDiscountCalculation == 5) {
      discountPrice =  (totalPriceBeforeDiscount * (this.globals.discount5years / 100));
    }
    let totalPrice = totalPriceBeforeDiscount - discountPrice;
    console.log("paidamount:" + paidamount + " totalPriceBeforeDiscount:" + totalPriceBeforeDiscount + " discountPrice:" + discountPrice+ " totalPrice:" + totalPrice);
   

    // substract paid amount from calculated amount
    totalPrice = totalPrice - paidamount;
    // round total price to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;



    return totalPrice;
  }

  private AddMonthsToDate(date: Date, months: number) {
    return new Date(date.setMonth(date.getMonth() + months));
  }

  PayNow() {

    if (this.form.valid == false) {
      console.log('form invalid');
      return;

    }

    this.licensepaymentService.deletependingpayments()
      .subscribe(
        response => {

          this.licensepaymentService.generatenesinglelicensepayment(this.licensePurchase)

            .subscribe(response => {
              console.log(response);
              let multiResponse = <iMultiLicensePurchaseResponse>response;
              let orderid = multiResponse.orderid;
              this.router.navigate(['/checkout', orderid]);

            })
          _error => {
            console.log('error');
            this.form.setErrors({
              invalid: true
            });
          }


        },
        _error => {
          console.log('error');
        }
      )


    //   let updatelicenseOk = true;
    //   let licensePayment: iLicensePayment;

    //   licensePayment = {} as iLicensePayment;
    //   licensePayment.licenseid = this.license.licenseid;
    //   licensePayment.planid = this.selectedPlan.planid;
    //   licensePayment.months = this.selectedPlan.periodmonths;
    //   licensePayment.amount = this.selectedPlan.amount;
    //   licensePayment.currency = this.selectedPlan.currency;
    //   licensePayment.expirationmethod = this.selectedPlan.expirationmethod;
    //   licensePayment.userid = this.currentUser.userid;
    //   licensePayment.paid = false;
    //   licensePayment.paymethod = '';
    //   licensePayment.orderid = 0;
    //   licensePayment.payreference = '';

    //   // console.log(licensePayment);

    //   this.licensepaymentService.deletependingpayments()
    //     .subscribe(
    //       response => {

    //         this.licensepaymentService.createupdate(licensePayment)

    //           .subscribe(response => {
    //             console.log(response);

    //             this.router.navigate(['/checkout']);

    //           })
    //         _error => {
    //           console.log('error');
    //           this.form.setErrors({
    //             invalid: true
    //           });
    //         }


    //       },
    //       _error => {
    //         console.log('error');
    //       }
    //     )

    // }
  }

  onSubmit() { }

}


