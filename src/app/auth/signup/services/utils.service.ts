import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel.model';
import { CurrentDate } from 'src/app/utils/CurrentDate';

let user = new UserModel();

@Injectable({
  providedIn: 'root'
})
export class SignUpUtilsService {

  date = new FormControl(new Date());

  constructor(private formBuilder: FormBuilder, private currentDate: CurrentDate) { }


  /**
   *
   * @returns
   */
  createSignupFormGroup(): FormGroup {
    return new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ),
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required,Validators.email, Validators.maxLength(100)]),
      telephone: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(9)]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)]),
      confirmPassword: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(''),
      createdAt: new FormControl(this.date.value),
      updatedAt: new FormControl(this.date.value)
    });
  };

  getUserObject(form: FormGroup): UserModel {
    let {
      fullname,
      username,
      email,
      telephone,
      password,
      role,
      isActive,
      createdAt,
      updatedAt
    } = form.value;

    return new UserModel(
      fullname,
      username.toLowerCase(),
      email.toLowerCase(),
      telephone,
      password,
      "Normal",
      true,
      this.currentDate.getDate(),
      this.currentDate.getDate());
  }




}



