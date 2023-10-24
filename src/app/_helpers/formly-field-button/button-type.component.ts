import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-button',
  template: `
    <div>
      <button style="width: 120px; background-color: #0074d9; color: #fff " [type]="props.type" [ngClass]="'btn btn-' + props.btnType" [disabled]="props.disabled" (click)="onClick($event)">
        {{ props.text }}
      </button>
    </div>
  `,
})
export class FormlyFieldButton extends FieldType {
  onClick($event: Event) {
    if (this.props.onClick) {
      this.props.onClick($event);
    }
  }
}