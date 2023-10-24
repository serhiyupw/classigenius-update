import { LicensepaymentService } from './../../_services/licensepayment.service';
import { LicensepaymentsComponent } from './../../licenses/licensepayments/licensepayments.component';
import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { iOrder } from '../order';
import { OrderService } from 'src/app/_services/order.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { iUser } from 'src/app/users/iUser';
import { iLicensePayment } from 'src/app/licenses/licensepayment';
import { LicenseService } from 'src/app/_services/license.service';
import { iLicense } from 'src/app/licenses/license';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { ConfirmMessageComponent } from 'src/app/_helpers/confirm-message/confirm-message.component';


export interface iCreateOrderResponse {
  orderid: number,

}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  public payPalConfig?: IPayPalConfig;
  orderPaid: boolean = false;
  
  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    public confirmDelete: ConfirmDeleteComponent,
    private licenseService: LicenseService,
    private LicensepaymentService: LicensepaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmMessage: ConfirmMessageComponent,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }



  currentUser: iUser;
  order: iOrder = {
    orderid: 0,
    accountid: 0,
    licenseid: 0,
    totalamount: 0,
    currency: 'USD',
    paid: false,
    reference: '',
    paymethod: '',
    userid : 0,
    paymentdate : new Date(),
    
    
  };
  licensePayments: iLicensePayment[];
  licenses: iLicense[];

  // createResponse: iCreateOrderResponse;

  form = new FormGroup({})

  ngOnInit(): void {


    let orderid = +this.route.snapshot.paramMap.get('id');

    // search order record by orderid
     this.orderService.get(orderid)
      .subscribe(
        response => {
          this.order = <iOrder>response;
          this.initConfig();
        },
        _error => {
          console.log('error');
        })
    // this.LicensepaymentService.getLookup("userid", this.currentUser.userid)
    //   .subscribe(
    //     response => {

    //       let licensePAymentsAll = <iLicensePayment[]>response;

    //       // filter licensepayments to get only the ones that are not paid
    //       this.licensePayments = licensePAymentsAll.filter(x => x.paid == false);

    //       //  console.log(this.licensePayments);
    //       //  console.log(this.order);

    //       // let licenseid = this.order.licenseid;

    //       // this.l.get(licenseid)
    //       //   .subscribe(
    //       //     response => {
    //       //       this.license = <iLicense>response;
    //       //  //     console.log(this.license);
    //       //     },
    //       //     _error => {
    //       //       console.log('error');
    //       //     }); 

    //       this.caclculateOrder();
    //   //    console.log(this.order.totalamount);

    //       this.licenseService.getAll()
    //         .subscribe(
    //           response => {
    //             this.licenses = <iLicense[]>response;
    //             // console.log(this.licenses);

    //           },
    //           error => {
    //             alert('Error');
    //             console.log('error');
    //           })

    //       this.initConfig();
    //     },
    //     _error => {
    //       console.log('error');
    //     });


    // console.log("licenseService");


  }


  ordernotpaid() {

    return !this.orderPaid;
    // if (this.order.paid != true) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  }

  LicenseKey(licenseid: number) {
    let name: string;
    if (this.licenses == null) {
      return "";
    }
    this.licenses.forEach(element => {
      if (element.licenseid == licenseid) {
        name = element.licensekey;
      }
    });

    return name;
  }

  delete(LicensePayment) {
    this.confirmDelete.displayDeleteConfirmationMessege()
      .subscribe(dialogResult => {

        if (dialogResult) {
          this.LicensepaymentService.delete(LicensePayment.licensepaymentid)
            .subscribe(response => {
              let index = this.licensePayments.indexOf(LicensePayment);
              this.licensePayments.splice(index, 1);
              this.caclculateOrder();
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });

  }

  private caclculateOrder() {
    this.order.totalamount = 0;
    this.licensePayments.forEach(element => {
      this.order.totalamount += Number(element.amount);
    });
  }

  private AddMonthsToDate(date: Date, months: number) {
    return new Date(date.setMonth(date.getMonth() + months));
  }


  
  OrderPaid(reference: string) {

     // set cursor to waiting
     document.body.style.cursor = 'wait';

    this.order.reference = reference;
    this.order.paymethod = "Paypal";
    this.order.paymentdate = new Date();
    this.order.accountid = this.currentUser.accountid;
    this.order.paid = true;
    console.log(this.order);

    this.orderService.updatePaid1(this.order)
      .subscribe(response => {

        document.body.style.cursor = 'default';
        this.orderPaid = true;
        this.confirmMessage.displayConfirmationMessege('Thank you for your payment. Your order is now complete.').subscribe(result => {
          if (result === true) {
            this.router.navigate(['/licenses']);
          }

        })

    

      })
    _error => {
      console.log('error');
      this.form.setErrors({
        invalid: true
      });
    }


  }

  private initConfig(): void {
    this.payPalConfig = {

      currency: this.order.currency,
       clientId: 'AeYPse8bGWJUFlTHY0mJd_xlLOlo3C90UWpvDfTqRdXqQLyiHZCkdxAIKByAEGvcZsm0ooRKnsi6nnZp',  // sandbox
      //clientId: 'ASyynwfGjueuqKR5szG4lsvt9cWj2V6doIAV2OvuK4oHuRrvktGtFm6iTKPn-2VWXm-Vivi076AuNok5',  // live

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
                name: 'License Subscription',
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

        this.OrderPaid(data.id);    // sending the paypal reference to the server

       
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

  CancelPayment() {

    this.licenseService.cancelpayment()
    .subscribe(response => {
      this.router.navigate(['/home']);
    })
    _error => {
      console.log('error');
      this.form.setErrors({
        invalid: true
      });
    }
    

  
  }

}
