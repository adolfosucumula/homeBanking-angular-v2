import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './welcome/page/page.component';
import { MainPageComponent } from './my-bank/customer-dashboard/main-page/main-page.component';
import { BalanceComponent } from './my-bank/customer-dashboard/balance/balance.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { UserStatusComponent } from './auth/user-status/user-status.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: PageComponent},
  { path: 'dashboard', component: MainPageComponent},
  { path: 'balance', component: BalanceComponent},
  { path: 'login', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: SignoutComponent},
  { path: 'user-inactive', component: UserStatusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
