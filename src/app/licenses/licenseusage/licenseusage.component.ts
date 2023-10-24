import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'licenseusage',
  templateUrl: './licenseusage.component.html',
  styleUrls: ['./licenseusage.component.scss']
})
export class LicenseusageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let licenseid = this.route.snapshot.paramMap.get('id');
  }

  backroute() {
    this.router.navigate(['/licenses']);
  }

}
