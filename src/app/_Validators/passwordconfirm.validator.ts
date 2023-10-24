import { FormGroup } from "@angular/forms";

export function CheckPasswords(control: FormGroup) {

    const password = control.get('password'); 
    const password2 = control.get('password2');

    if (password.value != "" && password2.value != "") {

      //  console.log(password.value+"-"+password2.value);
        if (password.value != password2.value) {
       
            return null;
        }
        else {
            return  { 'CheckPasswords': true }
          
        }
    }
    
    return null;
}