import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {Auth0Component} from './auth0/auth0.component';
import {RouterModule, Routes} from '@angular/router';
import {SiteNotFoundComponent} from './component/site-not-found/site-not-found.component';
import {AuthService} from './service/auth.service';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {LoginComponent} from './component/login/login.component';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthService]},
  {path: 'auth0', component: Auth0Component},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  {path: '**', component: SiteNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    Auth0Component,
    SiteNotFoundComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    NgbModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
