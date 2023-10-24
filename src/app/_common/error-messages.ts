import { FormlyFieldConfig } from "@ngx-formly/core";

export function minLengthValidationMessage(err, field: FormlyFieldConfig) {
  //  console.log(err);
    return `Value must be at least ${err.requiredLength} charachters`;
  }
  