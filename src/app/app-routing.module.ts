import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateGustComponent } from './pages/create-gust/create-gust.component';
import { CreateReserveComponent } from './pages/create-reserve/create-reserve.component';
import { ConsultGuestComponent } from './pages/consult-guest/consult-guest.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-guest', component: CreateGustComponent },
  { path: 'create-reserve', component: CreateReserveComponent },
  { path: 'consult-guest', component: ConsultGuestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
