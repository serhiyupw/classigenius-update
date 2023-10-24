import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FsesystemService } from '../_services/fsesystem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iFsesystem } from './iFsesystem';

@Component({
  selector: 'fsesystem-form',
  templateUrl: './fsesystem-form.component.html',
  styleUrls: ['./fsesystem-form.component.scss']
})
export class FsesystemFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', )
  });

  Fsesystem: iFsesystem;
  buttonText: string;

  constructor(private service: FsesystemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let fsesystemid = this.route.snapshot.paramMap.get('id');

    if (fsesystemid == '0') {   // new Fsesystem

      this.Fsesystem = {
        fsesystemid: 0,
        name: "",
        description: "" 
      } as iFsesystem;
      this.buttonText = "Create";
      console.log(this.Fsesystem);
    }
    else {    // update old Fsesystem
      this.buttonText = "Update";
      this.service.get(fsesystemid)
        .subscribe(
          response => {
            this.Fsesystem = <iFsesystem> response;
            console.log(this.Fsesystem);

            this.form.patchValue({
              name: this.Fsesystem.name,
              description: this.Fsesystem.description
             
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

  get description() {
    return this.form.get('description');
  }
  
  submit() {

    this.Fsesystem.name = this.form.value.name;
    this.Fsesystem.description = this.form.value.description;
   
    if (this.Fsesystem.fsesystemid == 0) {
      this.service.create(this.Fsesystem)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/fsesystems']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid : true
        });
      }
    }
    else {
      this.service.update(this.Fsesystem)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/fsesystems']);
        })
      _error => {
        console.log('error');
      }
    }
  }

}
