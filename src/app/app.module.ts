import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountModule } from './modules/account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';

//Importing Http client module because we have components that make http requests throught HttpClient module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderSpinnerComponent } from './spinner/loader-spinner/loader-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderSpinnerComponent
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
        AccountModule,
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
        HomeAccountComponent,
        MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
