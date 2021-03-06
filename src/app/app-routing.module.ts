import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"payments",component:PaymentComponent},
  {path:"brands",component:BrandListComponent,canActivate:[LoginGuard]},
  {path:"colors",component:ColorListComponent,canActivate:[LoginGuard]},
  {path:"car-list",component:CarListComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
