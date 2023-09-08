import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './my-bank/main-page/main-page.component';
import { BalanceComponent } from './my-bank/customer-dashboard/balance/balance.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { UserStatusComponent } from './auth/user-status/user-status.component';
import { BodyComponent } from './welcome/body/body.component';
import { AccountComponent } from './my-bank/account/account.component';
import { AddAccountComponent } from './my-bank/crud-account/add-account/add-account.component';
import { UserDashboardComponent } from './my-bank/user-dashboard/user-dashboard.component';
import { SendMoneyComponent } from './my-bank/send-money/send-money.component';
import { DebitAccountComponent } from './my-bank/crud-transactions/debit-transaction/debit-account.component';
import { CreditAccountComponent } from './my-bank/crud-transactions/credit-transaction/credit-account.component';
import { DebitTransComponent } from './my-bank/crud-transactions/debit-trans/debit-trans.component';
import { EditAccountComponent } from './my-bank/crud-account/edit-account/edit-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: BodyComponent},
  { path: 'dashboard', component: MainPageComponent},
  { path: 'balance', component: BalanceComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: SignoutComponent},
  { path: 'user-inactive', component: UserStatusComponent},
  { path: 'account', component: AccountComponent},
  { path: 'add-account', component: AddAccountComponent},
  { path: 'edit/account/:id', component: EditAccountComponent},
  { path: 'credit/account/:id', component: CreditAccountComponent},
  { path: 'debit/account/:id', component: DebitAccountComponent},
  { path: 'send-money', component: SendMoneyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
