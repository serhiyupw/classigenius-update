import { LicenseactivationService } from './../../_services/licenseactivation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseService } from 'src/app/_services/license.service';
import { iLicense } from '../license';
import { iLicenseActivation } from '../licenseactivation';

@Component({
  selector: 'app-licenseactivations',
  templateUrl: './licenseactivations.component.html',
  styleUrls: ['./licenseactivations.component.scss']
})
export class LicenseactivationsComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private licenseService: LicenseService,
      private LicenseactivationService: LicenseactivationService,

  ) { }


  licenseid : string;
  license : iLicense;
  licensekey : Text;
  licenseactivations : iLicenseActivation[];

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

      this.LicenseactivationService.getLookup("licenseid", +this.licenseid)
      .subscribe(
        response => {
          this.licenseactivations =<iLicenseActivation[]>response;
          console.log(this.licenseactivations);
        },
        error => {
      
          console.log('error');
        }
      )

      
  }
  backroute() {
    this.router.navigate(['/licenses']);
  }

}
