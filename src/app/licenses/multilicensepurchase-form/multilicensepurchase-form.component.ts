
import { Component, OnInit } from '@angular/core';
import { iUser } from 'src/app/users/iUser';
import { iMultiLicenseCartItem, iMultiLicensePurchase, iMultiLicensePurchaseResponse } from '../license';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { iPlan } from 'src/app/plans/plan';
import { iGlobals } from 'src/app/globals/globals';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PlanService } from 'src/app/_services/plan.service';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/_services/globals.service';
import { DefaultplantypeService } from 'src/app/_services/defaultplantype.service';
import { iDefaultPlanType } from 'src/app/defaultplantypes/defaulrplantype';
import { LicenseService } from 'src/app/_services/license.service';

@Component({
  selector: 'app-multilicensepurchase-form',
  templateUrl: './multilicensepurchase-form.component.html',
  styleUrls: ['./multilicensepurchase-form.component.scss']
})
export class MultilicensepurchaseFormComponent implements OnInit {

  currentUser: iUser;

  multiLicensePurchase: Partial<iMultiLicensePurchase>;
  multiLicenseCartItems:  iMultiLicenseCartItem[] = [];

  form = new FormGroup({})
  fields: FormlyFieldConfig[];

  formlyConfig: FormlyConfig;

  plans: iPlan[] = [];
  PlanTypes: iDefaultPlanType[] = [];
  ProjectLookup: any[] = [];
  globals: iGlobals;

  constructor(
     private authenticationService: AuthenticationService,
     private licenseService: LicenseService,
    private planService: PlanService,
    // private licensepaymentService: LicensepaymentService,
    // private project: ProjectService,
   // private route: ActivatedRoute,
    private defaultPlanTypeService: DefaultplantypeService,
    private router: Router,
   // private confirmMessage: ConfirmMessageComponent,
    private globalsService : GlobalsService
    ) 
    {
  }

  ngOnInit(): void {

   this.multiLicensePurchase = {} as iMultiLicensePurchase;


    // load plans
    this.planService.getLookup()
    .subscribe(
      response => {
        this.plans = <any[]>response;
        // console.log(this.plans);
      }
    )

    // get plan types
    this.defaultPlanTypeService.getAll()
    .subscribe(
      response => {
        this.PlanTypes = <any[]>response;
      }
    )

    this.globalsService.get(1)
    .subscribe(
      response => {
        this.globals = <iGlobals>response;
      
      }
    
    )

    this.fields = this.loadForms();
  }

  onSubmit() {

  }

  loadForms(): FormlyFieldConfig[] {
    return [
      {
        template: '<h2><label>Setup Licenses</label></h2>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-1',
            template: ' ',
          },
          {
            className: 'col-2',
            template: '<b>Number of Years</b>'
          },
          {
            className: 'col-2',
            template: '<b>Number of licenses</b>'
          },
          {
            className: 'col-2',
            template: '<b>Price (USD)</b>'
          }
        ]
      },
      {
        template: '<br/>',
      },

      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-1',
            template: '<label>Architect</label>',
          },
          {
            key: 'setupyears',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=5),
                message: 'Must be between 1 and 5',
              } ,
              min:{
                expression: (c: FormControl) => (c.value>=1),
                message: 'Must be between 1 and 5',
              } 
            }

          },
          {
            key: 'setupquantity',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
         
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=20),
                message: 'Must be between 1 and 20',
              } 
            }

          },
          {
            key: 'setupamount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: true,
            },
            expressionProperties: {
              // calculate amount
              'model.setupamount': (model: any) => {
                if (model.setupyears != undefined && model.setupquantity != undefined) {
                return this.calculatePlanAmount(model.setupyears , model.setupquantity ,3);
                }
              },
            }
            
          },
          {
            type: 'button',
            className: 'col-2',
            props: {
              text: 'Add to Cart',
              btnType: 'info',
          
              onClick: () => this.AddToCart(this.multiLicensePurchase.setupyears , this.multiLicensePurchase.setupquantity , this.multiLicensePurchase.setupamount,3),
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.setupamount === undefined || model.setupamount == ""  || Number.isNaN(model.setupamount )
              },

          }

        ]
      },
      {
        template: '<h2><label>Runtime Licenses</label></h2>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-1',
            template: '<label>OCR Only</label>',
          },
          {
            key: 'basicyears',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
           
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=5),
                message: 'Must be between 1 and 5',
              } 
            }

          },
          {
            key: 'basicquantity',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              // label: 'Number of licenses',
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=20),
                message: 'Must be between 1 and 20',
              } 
            }
          },
          {
            key: 'basicamount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              readonly: true,
            },
            expressionProperties: {
              'model.basicamount': (model: any, formState: any, field: FormlyFieldConfig) => {
                return this.calculatePlanAmount(model.basicyears , model.basicquantity ,4);
              },
            }
          },
          {

            type: 'button',
            className: 'col-1',
            props: {
              text: 'Add to Cart',
              btnType: 'info',
       
              onClick: () => this.AddToCart(this.multiLicensePurchase.basicyears , this.multiLicensePurchase.basicquantity , this.multiLicensePurchase.basicamount,4),
  
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.basicamount === undefined || model.basicamount == ""  || Number.isNaN(model.basicamount )

            
            },
          }



        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-1',
            template: '<label>Architect</label>',
          },
          {
            key: 'architectyears',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
           
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=5),
                message: 'Must be between 1 and 5',
              } 

            }

          },
          {
            key: 'architectquantity',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              // label: 'Number of licenses',
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=20),
                message: 'Must be between 1 and 20',
              } 
            }

          },
          {
            key: 'architectamount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
          
              readonly: true,
            },
            expressionProperties: {
              'model.architectamount': (model: any, formState: any, field: FormlyFieldConfig) => {
                return this.calculatePlanAmount(model.architectyears , model.architectquantity ,5);
              },
            }
  
          },
          {

            type: 'button',
            className: 'col-1',
            props: {
              text: 'Add to Cart',
              btnType: 'info',

              onClick: () => this.AddToCart(this.multiLicensePurchase.architectyears , this.multiLicensePurchase.architectquantity , this.multiLicensePurchase.architectamount,5),
  
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.architectamount === undefined || model.architectamount == ""  || Number.isNaN(model.architectamount )
        
            },
          }



        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-1',
            template: '<label>Enterprise</label>',
          },
          {
            key: 'fullyears',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
            
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=5),
                message: 'Must be between 1 and 5',
              } 

            }

          },
          {
            key: 'fullquantity',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
      
              readonly: false,
            },
            validators: {
              max:{
                expression: (c: FormControl) => (c.value<=20),
                message: 'Must be between 1 and 20',
              } 
            }

          },
          {
            key: 'fullamount',
            type: 'input',
            className: 'col-2',
            templateOptions: {
              type: 'number',
              // label: 'Price',
              readonly: true,
            },
            expressionProperties: {
              'model.fullamount': (model: any, formState: any, field: FormlyFieldConfig) => {
                return this.calculatePlanAmount(model.fullyears , model.fullquantity ,6);
              },
            }
          },
          {

            type: 'button',
            className: 'col-1',
            props: {
              text: 'Add to Cart',
              btnType: 'info',

              onClick: () => this.AddToCart(this.multiLicensePurchase.fullyears , this.multiLicensePurchase.fullquantity , this.multiLicensePurchase.fullamount,6),
            },
            expressionProperties: {
              'templateOptions.disabled': model => model.fullamount === undefined || model.fullamount == ""  || Number.isNaN(model.fullamount )
           
            },
          }

        ]
      },
    ]
  }

  calculatePlanAmount(years: number, quantity : number, plantype: number)
  {
    // look for plan based on plantype
    let plan = this.plans.find(plan => plan.plantypedefault  == plantype);
    console.log(plan);
    if (plan == undefined) {
      return "";
    }

    if (years == undefined || quantity == undefined) {
      return "";
    }

    if (years > 5 || quantity > 20) {
      return "";
    }
    let pricePerYear = plan.amount * (plan.periodmonths / 12);
    let totalPriceBeforeDiscount =  pricePerYear * quantity  * years ;
    let totalPrice = totalPriceBeforeDiscount;

    console.log("pricePerYear: " + pricePerYear + " licenses: " + quantity+ " years: " + years + " totalPriceBeforeDiscount: " + totalPriceBeforeDiscount);


    if (this.globals.discount2years > 0 && years == 2) {
       totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount2years / 100));
    }
    if (this.globals.discount3years > 0 && years == 3) {
      totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount3years / 100));
    }
    if (this.globals.discount4years > 0 && years == 4) {
      totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount4years / 100));
    }
    if (this.globals.discount5years > 0 && years == 5) {
      totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.globals.discount5years / 100));
    }

    return totalPrice;
  }

  AddToCart( years: number, quantity : number, totalPrice: number, plantype: number) {
  
   
    let newCartItem: iMultiLicenseCartItem = {
      plantype: plantype,
      years: years,
      quantity: quantity,
      amount: totalPrice,
    }

    this.multiLicenseCartItems.push(newCartItem);

  }

  removeCartItem(plantype: number) {
    // remove item from cart
    console.log(plantype);
    let index = this.multiLicenseCartItems.findIndex(item => item.plantype == plantype);
    if (index > -1) {
      this.multiLicenseCartItems.splice(index, 1);
    }
  }

  calculateTotlaAmount() {
     // calculate total amount based on cart items
      let totalAmount = 0;
      this.multiLicenseCartItems.forEach(item => {
        totalAmount += item.amount;
      });

      return totalAmount;
   
  }

  planTypeDescription(plantype : number)
  {
    // console.log(plantype );
    // return plantype description
    let planType = this.PlanTypes.find(planType => planType.defaultplantypeid == plantype);
    if (planType == undefined) {
      return '';
    }
    return planType.name;
  }

  payNow()
  {
      // console.log('pay now');

      this.licenseService.generatenemultilicenses(this.multiLicenseCartItems)
      .subscribe(
        Response => {
  
          // console.log(Response);
          let multiResponse =   <iMultiLicensePurchaseResponse> Response;
          let orderid = multiResponse.orderid;
          this.router.navigate(['/checkout1', orderid]);
  
        },
        _error => {
          console.log('error');
        }
       
      )
  
    
  }


}
