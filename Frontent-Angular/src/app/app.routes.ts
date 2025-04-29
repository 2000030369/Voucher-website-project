import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { VoucherDetailsComponent } from './pages/voucher-details/voucher-details.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'voucher/:id', component: VoucherDetailsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'checkout/:voucherId', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)},
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'payment-success',loadComponent: () => import('./pages/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent)},
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'voucher/:id', component: VoucherDetailsComponent },
  { path: 'voucher/:id',component: VoucherDetailsComponent,},
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/admin-login.component').then(m => m.AdminLoginComponent)},
  { path: 'admin',loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
