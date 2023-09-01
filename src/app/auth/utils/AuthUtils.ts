import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthUtils {

  constructor(private router: Router, private formBuilder: FormBuilder){}

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  createSigninFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      createdAt: new FormControl(this.date.value)
    });
  };

  validateForm(){
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)] ],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ],
    });
  }

/**
 *
 * @param form
 * @returns
 */
  getLoginFormData(form: FormGroup) {
    let {
      username,
      password,
      createdAt
    } = form.value;

    return {
      username,
      password,
      createdAt
    };
  }

}
