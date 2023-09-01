import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';

//Importing Http client module because we have components that make http requests throught HttpClient module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderSpinnerComponent } from './spinner/loader-spinner/loader-spinner.component';
import { LoadingInterceptor } from './spinner/interceptor/loading.interceptor';
import { PageComponent } from './welcome/page/page.component';
import { AlertModalComponent } from './dialog/alert-modal/alert-modal.component';
import { ErrorAlertDialogComponent } from './dialog/error-alert-dialog/error-alert-dialog.component';
import { SuccessAlertDialogComponent } from './dialog/success-alert-dialog/success-alert-dialog.component';
import { UserDashboardComponent } from './my-bank/user-dashboard/user-dashboard.component';
import { MainPageComponent } from './my-bank/customer-dashboard/main-page/main-page.component';
import { BalanceComponent } from './my-bank/customer-dashboard/balance/balance.component';
import { AccountComponent } from './my-bank/account/account.component';
import { AddAccountComponent } from './my-bank/crud-account/add-account/add-account.component';
import { EditAccountComponent } from './my-bank/crud-account/edit-account/edit-account.component';
import { SendMoneyComponent } from './my-bank/crud-transactions/send-money/send-money.component';
import { ReceiptMoneyComponent } from './my-bank/crud-transactions/receipt-money/receipt-money.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderSpinnerComponent,
    PageComponent,
    UserDashboardComponent,
    MainPageComponent,
    BalanceComponent,
    AccountComponent,
    AlertModalComponent,
    ErrorAlertDialogComponent,
    SuccessAlertDialogComponent,
    AddAccountComponent,
    EditAccountComponent,
    SendMoneyComponent,
    ReceiptMoneyComponent
  ],
  imports: [
     BrowserModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NgIf,
        NgFor,
        MatToolbarModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        AsyncPipe,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
