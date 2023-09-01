import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './welcome/page/page.component';
import { MainPageComponent } from './my-bank/customer-dashboard/main-page/main-page.component';
import { BalanceComponent } from './my-bank/customer-dashboard/balance/balance.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: PageComponent},
  { path: 'dashboard', component: MainPageComponent},
  { path: 'balance', component: BalanceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
