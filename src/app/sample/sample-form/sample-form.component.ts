import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  form = new FormGroup({});
  model = {
    firstname: 'Juri',
    age: 34
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Firstname'
      }
    }
  ];

  onSubmit({ valid, value }) {
    console.log(value);
  }

}
