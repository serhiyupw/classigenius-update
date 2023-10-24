import { FormControl } from "@angular/forms";

export function ValidatePaid(control: FormControl) {

  const paid = control.get('paid');
 // console.log(paid);

  if (paid.value != true) {
   // console.log("not paid");
    return null;
  }
  else {
    console.log("paid");
    return { 'checkPayed': true }

  }
  return null;

}

