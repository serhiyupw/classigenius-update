import { iLicense } from './../../licenses/license';
import { LicenseService } from './../../_services/license.service';
import { OrderService } from './../../_services/order.service';
import { iOrder } from './../order';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ValidatePaid } from 'src/app/_Validators/checkpaid.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-tranzila',
  templateUrl: './tranzila.component.html',
  styleUrls: ['./tranzila.component.scss']
})
export class TranzilaComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private licenseService: LicenseService,
    private sanitizer: DomSanitizer
    )
    { 
     this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.iframeSource());
     console.log(this.trustedUrl);
    }

    
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
 
  trustedUrl ;


    ngOnInit(): void {
    
      let orderid = this.route.snapshot.paramMap.get('id');
  
      // console.log(orderid);
      this.orderService.get(orderid)
        .subscribe(
          response => {
            this.order = <iOrder>response;
          //  console.log(this.order);
            this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSource());
            console.log(this.trustedUrl);

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
        
          },
          _error => {
            console.log('error');
          });
               
  
    }


    save(content: string) {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(blob, 'hello.txt');
    }
  

    iframeSource() {

      // let sanitizer: DomSanitizer

      let f = "%5B%7B%22product_name%22%3A%22product%22%2C%22product_quantity%22%3A1%2C%22product_price%22%3A1%7D%2C%7B%22product_name%22%3A%22product2%22%2C%22product_quantity%22%3A1%2C%22product_price%22%3A1%7D%2C%7B%22product_name%22%3A%22product3%22%2C%22product_quantity%22%3A1%2C%22product_price%22%3A1%7D%2C%7B%22product_name%22%3A%22product4%22%2C%22product_quantity%22%3A1%2C%22product_price%22%3A1%7D%2C%7B%22product_name%22%3A%22product5%22%2C%20%22product_quantity%22%3A1%2C%20%22product_price%22%3A1%7D%5D";
   
      let prductList = '[{"product_name":"product","product_quantity":"1","product_price":"10"}]';
      let encoded =  encodeURIComponent(prductList); 
  
      // console.log(encoded);


      // let tranzilaiFrame = "https://direct.tranzila.com/cttest/iframenew.php?sum={sum}&currency=2&cred_type=1&u71=1&json_purchase_data="+encoded ;
     
      let tranzilaiFrame = "https://direct.tranzila.com/cttest/iframenew.php?sum={sum}&currency=1&cred_type=1&u71=1";
      tranzilaiFrame = tranzilaiFrame.replace('{sum}',  this.order.totalamount.toString());
      console.log(tranzilaiFrame);
      // this.save(tranzilaiFrame);
      //let tranzilaiFrame = "http://localhost:4200/#/tranzilapaymentconfirm";
      return tranzilaiFrame;
    }
  

}
