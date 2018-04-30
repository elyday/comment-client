import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {Auth0Component} from './auth0/auth0.component';
import {RouterModule, Routes} from "@angular/router";
import {StartpageComponent} from './startpage/startpage.component';
import {SiteNotFoundComponent} from './site-not-found/site-not-found.component';
import {AuthService} from "./service/auth.service";
import {CallbackComponent} from './component/callback/callback.component';

const appRoutes: Routes = [
  {path: '', component: StartpageComponent},
  {path: 'auth0', component: Auth0Component},
  {path: 'callback', component: CallbackComponent},
  {path: '**', component: SiteNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    Auth0Component,
    StartpageComponent,
    SiteNotFoundComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
