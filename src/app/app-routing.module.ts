import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'dashboard',component: DashboardComponent},
  {path: 'restaurants',component: RestaurantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
