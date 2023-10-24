import { AbstractControl } from '@angular/forms';

export function ValidateCheckDigit(control: AbstractControl) {

    if (control.value.length == 0)
        return null;

    if (!control.value.startsWith('1')) {
        return { validCheckDigit: true };
    }
    return null;
}

