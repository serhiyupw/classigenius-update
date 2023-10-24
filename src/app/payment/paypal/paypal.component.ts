import { iLicense } from './../../licenses/license';
import { LicenseService } from './../../_services/license.service';
import { OrderService } from './../../_services/order.service';
import { iOrder } from './../order';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IPayPalConfig, ICreateOrderRequest, ICreateSubscriptionRequest } from 'ngx-paypal';
import { ValidatePaid } from 'src/app/_Validators/checkpaid.validator';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private licenseService: LicenseService) { }

  order: iOrder = {
    orderid: 0,
    accountid : 0,
    licenseid: 0,
    totalamount: 0,
    currency: '',
    paid: false,
    reference: '',
    paymethod: '',
    userid : 0,
    paymentdate : new Date(),
  };
  license: Partial<iLicense> ={};


  form = new FormGroup({})

  fields: FormlyFieldConfig[] = [
    {
      validators: [
        { name: 'validatepaid', validation: ValidatePaid },
      ],
      // validators: {
      //   validation: [checkPayed],

      // },
      fieldGroup: [
        {
          key: 'totalamount',
          type: 'input',
          templateOptions: {
            type: 'decimal',
            maxLength: 10,
            label: 'Amount',
            disabled: false,
          }
        },
        {
          key: 'currency',
          type: 'input',
          templateOptions: {
            type: 'decimal',
            maxLength: 10,
            label: 'Currency',
            disabled: true,
          }
        },
        {
          key: 'paid',
          type: 'checkbox',

          templateOptions: {
            label: 'Paid',
            disabled: true,

          }
        },
      ]
    }
  ]


  ngOnInit(): void {

    let orderid = this.route.snapshot.paramMap.get('id');

    // console.log(orderid);
    this.orderService.get(orderid)
      .subscribe(
        response => {
          this.order = <iOrder>response;
        //  console.log(this.order);

          let licenseid = this.order.licenseid;
   
          this.licenseService.get(licenseid)
            .subscribe(
              response => {
                this.license = <iLicense>response;
           //     console.log(this.license);
              },
              _error => {
                console.log('error');
              }); 



          this.initConfig();
        },
        _error => {
          console.log('error');
        });
             

  }


  ordernotpaid() {
    // console.log(this.order.paid);
    if (this.order.paid != true) {
      return true;
    }
    else {
      return false;
    }
  }

  onSubmit({ valid, value }) {
  }

  private initConfig(): void {
    this.payPalConfig = {
     
      currency: this.order.currency,
      clientId: 'AeYPse8bGWJUFlTHY0mJd_xlLOlo3C90UWpvDfTqRdXqQLyiHZCkdxAIKByAEGvcZsm0ooRKnsi6nnZp',

      // vault : "true",
      // intent : "subscription",
      // createSubscriptionOnClient: (data) => <ICreateSubscriptionRequest>{
      //    plan_id: 'P-98W5642498937922EMQ53AZY', // Replace with your own plan ID
      //   application_context: {
      //     brand_name: 'Charactell', // Replace with your own brand name
      //     shipping_preference: 'NO_SHIPPING', // Set to "NO_SHIPPING" if there is no physical product being shipped
      //     user_action: 'SUBSCRIBE_NOW' // Set to "SUBSCRIBE_NOW" to show a "Subscribe Now" button
      //   }
      // },

     
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: this.order.currency,
              value: this.order.totalamount as unknown as string,
              breakdown: {
                item_total: {
                  currency_code: this.order.currency,
                  value: this.order.totalamount as unknown as string,
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: this.order.currency,
                  value: this.order.totalamount as unknown as string,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true', 
      
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        size: "small",

      },

      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
           console.log('onApprove - you can get full order details inside onApprove: ', details);
        }
        );
      },
             
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.order.reference = data.id;
        this.order.paymethod = "Paypal";
        this.order.paid = true;
        
        console.log(this.order);

        this.orderService.update(this.order)
          .subscribe(response => {

          })
        _error => {
          console.log('error');
          this.form.setErrors({
            invalid: true
          });
        }
  
        this.license.paid = true;
        this.licenseService.update(this.license)
          .subscribe(response => {
          })
        _error => {
          console.log('error');
          this.form.setErrors({
            invalid: true
          });
        }


        this.showSuccess = true;
        this.router.navigate(['/home']);
      },

      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
