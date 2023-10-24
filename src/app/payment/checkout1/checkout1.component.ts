import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { iOrder } from '../order';
import { iUser } from 'src/app/users/iUser';
import { OrderService } from 'src/app/_services/order.service';
import { ConfirmMessageComponent } from 'src/app/_helpers/confirm-message/confirm-message.component';

@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.scss']
})
export class Checkout1Component implements OnInit {

  public payPalConfig?: IPayPalConfig;


  currentUser: iUser;
  order: Partial<iOrder> = {}
  orderPaid: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private confirmMessage: ConfirmMessageComponent,
    private router: Router,

  ) { }

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

  }



  private initConfig(): void {
    this.payPalConfig = {

      currency: this.order.currency,
       clientId: 'AeYPse8bGWJUFlTHY0mJd_xlLOlo3C90UWpvDfTqRdXqQLyiHZCkdxAIKByAEGvcZsm0ooRKnsi6nnZp',  // sandbox
    //  clientId: 'ASyynwfGjueuqKR5szG4lsvt9cWj2V6doIAV2OvuK4oHuRrvktGtFm6iTKPn-2VWXm-Vivi076AuNok5',  // live

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

  ordernotpaid() {

    return !this.orderPaid;
    
  }
  OrderPaid(reference: string) {

    // set cursor to waiting
    document.body.style.cursor = 'wait';


    this.order.reference = reference;
    this.order.paymethod = "Paypal";
    this.order.paymentdate = new Date();
    // this.order.accountid = this.currentUser.accountid;
    this.order.paid = true;
    // console.log(this.order);

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
      // this.form.setErrors({
      //   invalid: true
      // });
    }


  }


  CancelPayment() {

    // this.licenseService.cancelpayment()
    // .subscribe(response => {
    //   this.router.navigate(['/home']);
    // })
    // _error => {
    //   console.log('error');
    //   this.form.setErrors({
    //     invalid: true
    //   });
    // }



  }

}
