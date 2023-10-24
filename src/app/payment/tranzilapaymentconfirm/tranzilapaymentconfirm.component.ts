import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tranzilapaymentconfirm',
  templateUrl: './tranzilapaymentconfirm.component.html',
  styleUrls: ['./tranzilapaymentconfirm.component.scss']
})
export class TranzilapaymentconfirmComponent implements OnInit {

  queryParams: any;
  constructor(private route: ActivatedRoute)
  { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      console.log(this.queryParams);
    });
  }

}
