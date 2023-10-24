import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-confirmation',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.scss']
})
export class SignupConfirmationComponent implements OnInit {

  email = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
  }

}
