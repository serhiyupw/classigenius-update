import { iFsesite } from './iFsesite';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FsesiteService } from '../_services/fsesite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fsesite-form',
  templateUrl: './fsesite-form.component.html',
  styleUrls: ['./fsesite-form.component.css']
})
export class FsesiteFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ip: new FormControl('', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$")])
  });

  fsesite: iFsesite;
  buttonText: string;

  constructor(private service: FsesiteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let siteid = this.route.snapshot.paramMap.get('siteid');

    if (siteid == '0') {   // new fsesite

      this.fsesite = {
        siteid: 0,
        name: "",
        ip: "" 
      } as iFsesite;
      this.buttonText = "Create";
      console.log(this.fsesite);
    }
    else {    // update old fsesite
      this.buttonText = "Update";
      this.service.get(siteid)
        .subscribe(
          response => {
            this.fsesite = <iFsesite> response;
            console.log(this.fsesite);

            this.form.patchValue({
              name: this.fsesite.name,
              ip: this.fsesite.ip
             
            })
          },
          _error => {
            console.log('error');
          })
    }
  }

  get name() {
    return this.form.get('name');
  }

  get ip() {
    return this.form.get('ip');
  }
  
  submit() {

    this.fsesite.name = this.form.value.name;
    this.fsesite.ip = this.form.value.ip;
   
    if (this.fsesite.siteid == 0) {
      this.service.create(this.fsesite)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/fsesites']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid : true
        });
      }
    }
    else {
      this.service.update(this.fsesite)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/fsesites']);
        })
      _error => {
        console.log('error');
      }
    }
  }


}
