import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseService } from 'src/app/_services/license.service';
import { iLicense } from '../license';
import { LicensepaymentService } from 'src/app/_services/licensepayment.service';
import { iLicensePayment } from '../licensepayment';

@Component({
  selector: 'licensepayments',
  templateUrl: './licensepayments.component.html',
  styleUrls: ['./licensepayments.component.scss']
})
export class LicensepaymentsComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private licenseService: LicenseService,
    private licensepaymentService: LicensepaymentService,

  ) { }


  licenseid : string;
  license : iLicense;
  licensekey : Text;
  licensepayments : iLicensePayment[];


  ngOnInit(): void {

    this.licenseid = this.route.snapshot.paramMap.get('id');

    this.licenseService.get(this.licenseid)
    .subscribe(
      response => {
        this.license = <iLicense>response;
        // this.licensekey = this.license.licensekey ;
     
        if (this.license.licenseid == null) {
          this.router.navigate(['/home']);
        }

      },
      _error => {
        console.log('error');
      })

      this.licensepaymentService.getLookup("licenseid", +this.licenseid)
      .subscribe(
        response => {
          let licensepaymentsUnfilter = <iLicensePayment[]>response;
          this.licensepayments = licensepaymentsUnfilter.filter(x => x.paid == true);
       //   this.licensepayments = <iLicensePayment[]>response;
      //    console.log(this.licensepayments);

        },
        error => {
          alert('Error');
          console.log('error');
        }
      )



  }

  backroute() {
    this.router.navigate(['/licenses']);
  }


}
