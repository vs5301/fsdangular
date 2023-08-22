import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideFirestore, getFirestore } from  '@angular/fire/firestore'
import { FirestoreModule } from '@angular/fire/firestore';
import { ProfileComponent } from './pages/profile/profile.component'
import { DbService } from './service/db.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    RestaurantsComponent,
    ProfileComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
    DbService,
    {
      provide: APP_INITIALIZER,
      useFactory: function(dbService: DbService) {
        return () => dbService.onLoad()
      },
      deps: [DbService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
