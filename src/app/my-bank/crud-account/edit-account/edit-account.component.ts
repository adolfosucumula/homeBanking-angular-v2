import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountUtils } from '../utils/accountUtils';
import { AccountGetService } from '../../account/service/account-get.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AccountUpdatePostService } from '../service/account-update.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

   /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
   accountForm: FormGroup = new FormGroup({
    account: new FormControl(''),
    iban: new FormControl(''),
    swift: new FormControl(''),
    owner: new FormControl(''),
    ownerDoc: new FormControl(''),
    initialBalance: new FormControl(''),
    currency: new FormControl(''),
    createdAt: new FormControl(''),
    isActive: new FormControl(false),
  });

  id!: number;
  submitted = false;
  errorMessage!: string;



  constructor(
    private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe,
    private route: ActivatedRoute,private router: Router,
    private accountGetService: AccountGetService,
    private accountUpdateService: AccountUpdatePostService,
    private utils: AccountUtils, public dialog: MatDialog
    ) { }

  ngOnInit(): void {


    //Function to validate the form fields according to the specific rules
    this.accountForm = this.formBuilder.group({
      account: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
      iban: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$'), Validators.minLength(19), Validators.maxLength(19)]],
      swift: ['', [Validators.required, Validators.pattern('^[A-Z]+$'), Validators.minLength(8), Validators.maxLength(8)] ],
      owner: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
      ownerDoc: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$'), Validators.maxLength(10)] ],
      initialBalance: ['', [Validators.required] ],
      currency: ['', [Validators.required, Validators.minLength(2)] ],
      createdAt: ['', [Validators.required, Validators.maxLength(9)] ],
      isActive: [false, Validators.required],
    });


    /**
     * Function to catch the event typing from currency field to check the values being typing by user
     * are valid or not.
     * First is removed the all non digit from field, next remove the leading zeros meaning the values might make sense,
     * at the end its neccessary to stop/disable function to emit any event, otherwise its gonna be on the infinity loop.
     * */
    this.accountForm.valueChanges.subscribe( form => {
      if(form.initialBalance){
        this.accountForm.patchValue({
          initialBalance: this.currencyPipe.transform(form.initialBalance.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
    });

    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));

      this.getById(this.id);

    });

  };



  //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
  get _fC(): {[key: string]: AbstractControl } {
    return this.accountForm.controls;
  };


  getById(id: number){
    this.accountGetService.getById(id).subscribe((data: any) => {
      //console.log(JSON.stringify(data, null, 2));
      this.accountForm.patchValue(data);
    })
  };

  onSubmit(): void{

    this.submitted = true;

    if(this.accountForm.invalid){
      return;
    }

    this.accountUpdateService.update(this.id,
      this.utils.getFormData(this.accountForm).account,
      this.utils.getFormData(this.accountForm).iban,
      this.utils.getFormData(this.accountForm).swift,
      this.utils.getFormData(this.accountForm).owner,
      this.utils.getFormData(this.accountForm).ownerDoc,
      this.utils.getFormData(this.accountForm).initialBalance,
      this.utils.getFormData(this.accountForm).initialBalance,
      this.utils.getFormData(this.accountForm).currency,
      this.utils.getFormData(this.accountForm).createdAt,
      this.utils.getFormData(this.accountForm).isActive)
    .subscribe((data: any) => {
      this.router.navigate(['/dashboard']);
    })
  }
}
