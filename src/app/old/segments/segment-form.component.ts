import { iSegment } from './iSegment';
import { SegmentService } from '../_services/segment.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'segment-form',
  templateUrl: './segment-form.component.html',
  styleUrls: ['./segment-form.component.css']
})
export class SegmentFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    segmenttype: new FormControl('', 
    [ Validators.required,
      // Validators.pattern("^[0-9]*$")
    ]),
    location: new FormControl(''),
    key1: new FormControl(''),
    key2: new FormControl(''),
    key3: new FormControl('')
  });

  segment: iSegment;
  buttonText: string;

  segmenttypes = [
     { id: 1, name: 'Amazon' },
     { id: 2, name: 'Local' },
  ]
  constructor(private service: SegmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let segmentid = this.route.snapshot.paramMap.get('id');

    if (segmentid == '0') {   // new segment
      this.segment = {
        segmentid: 0,
        name: "",
        segmenttype: 1,
        location: "",
        key1: "",
        key2: "",
        key3: "",
      } as iSegment;
      this.buttonText = "Create";
      console.log(this.segment);
    }
    else {    // update old segment
      this.buttonText = "Update";
  //    this.service.getSegment(segmentid)
      this.service.get(segmentid)
        .subscribe(
          response => {
            this.segment = <iSegment>response;
            console.log(this.segment);

            this.form.patchValue({
              name: this.segment.name,
              segmenttype: this.segment.segmenttype,
              location: this.segment.location,
              key1: this.segment.key1,
              key2: this.segment.key2,
              key3: this.segment.key3
            })
          },
          _error => {
            console.log('error');
          })
    }
  }


  get name()
  {
    return this.form.get('name');
  }

  get segmenttype()
  {
    return this.form.get('segmenttype');
  }


  submit() {

    this.segment.name = this.form.value.name;
    this.segment.segmenttype = this.form.value.segmenttype;
    this.segment.location = this.form.value.location;
    this.segment.key1 = this.form.value.key1;
    this.segment.key2 = this.form.value.key2;
    this.segment.key3 = this.form.value.key3;

    if (this.segment.segmentid == 0) {
  //    this.service.createSegment(this.segment)
      this.service.create(this.segment)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/segments']);
        })
      _error => {
        console.log('error');
        this.form.setErrors({
          invalid : true
        });
      }
    }
    else {
    //  this.service.updateSegment(this.segment)
      this.service.update(this.segment)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/segments']);
        })
      _error => {
        console.log('error');
      }
    }
  }
}
