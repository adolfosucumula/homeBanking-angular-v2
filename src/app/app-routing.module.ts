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
import { SendMoneyComponent } from './my-bank/send-money/send-money.component';
import { DebitAccountComponent } from './my-bank/crud-transactions/debit-transaction/debit-account.component';
import { CreditAccountComponent } from './my-bank/crud-transactions/credit-transaction/credit-account.component';
import { EditAccountComponent } from './my-bank/crud-account/edit-account/edit-account.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: BodyComponent},
  { path: 'dashboard', component: MainPageComponent, canActivate: [AuthGuard]},
  { path: 'balance', component: BalanceComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: SignoutComponent, canActivate: [AuthGuard]},
  { path: 'user-inactive', component: UserStatusComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'add-account', component: AddAccountComponent, canActivate: [AuthGuard]},
  { path: 'edit/account/:id', component: EditAccountComponent, canActivate: [AuthGuard]},
  { path: 'trans/account/:id/:type', component: CreditAccountComponent, canActivate: [AuthGuard]},
  //{ path: 'trans/account/:id/:type', component: DebitAccountComponent, canActivate: [AuthGuard]},
  { path: 'send-money', component: SendMoneyComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
