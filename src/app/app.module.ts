import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {Auth0Component} from './auth0/auth0.component';
import {RouterModule, Routes} from '@angular/router';
import {SiteNotFoundComponent} from './component/site-not-found/site-not-found.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {LoginComponent} from './component/login/login.component';
import {AccessDeniedComponent} from './component/access-denied/access-denied.component';
import {HttpClientModule} from '@angular/common/http';
import {BlogInformationService} from './service/blog-information.service';
import {BlogComponent} from './component/blog/blog.component';
import {FormsModule} from '@angular/forms';
import {LoginCallbackComponent} from './component/login-callback/login-callback.component';
import {AuthGuardService} from './service/auth-guard.service';
import {AuthService} from './service/auth.service';


const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'auth0', component: Auth0Component},
  {path: 'login', component: LoginComponent},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGuardService]},
  {path: 'callback', component: LoginCallbackComponent},
  {path: '**', component: SiteNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    Auth0Component,
    SiteNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    AccessDeniedComponent,
    BlogComponent,
    LoginCallbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    BlogInformationService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
