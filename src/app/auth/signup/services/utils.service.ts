import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel';
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
      fullname: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(0),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(''),
      createdAt: new FormControl(this.date.value),
      updatedAt: new FormControl(this.date.value)
    });
  };

  /**
   *
   */
  validateFieldGroup(){
    //Function to validate the form fields according to the specific rules
    return this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)] ],
      email: ['', [Validators.required,Validators.email, Validators.maxLength(100)] ],
      telephone: ['', [Validators.required,Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(9)] ],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ],
      //confirmPassword: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ]
    });
  }

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



