import { AbstractControl, ValidatorFn } from "@angular/forms";

export default class myValidation {

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if(checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }

    }
  }

   /**
   * Function to check the values typing by user on the currency field.
   * First the non digite is removed
   * */
  isDigite(){

  }


}
