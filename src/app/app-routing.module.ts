import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { NewsComponent } from './pages/news/news.component';
import { LifecyclehooksComponent } from './pages/lifecyclehooks/lifecyclehooks.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'dashboard',component: DashboardComponent},
  {path: 'restaurants',component: RestaurantsComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'authenticate', component:AuthenticateComponent},
  {path: 'dishes', component:DishesComponent},
  {path: 'news', component:NewsComponent},
  {path: 'lifecycle', component:LifecyclehooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
