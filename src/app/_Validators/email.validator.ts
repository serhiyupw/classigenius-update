import { FormControl } from '@angular/forms';

export function ValidateEmail( control: FormControl) {
    if (control.value=='')
    {
      return null;
    }

    let regexOk =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) ;
   
    if  (regexOk) 
      return  { 'ValidateEmail': true }

    return null;
}
