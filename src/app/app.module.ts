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
import {AccessDeniedComponent} from './component/access-denied/access-denied.component';
import {HttpClientModule} from '@angular/common/http';
import {BlogInformationService} from './service/blog-information.service';
import {BlogComponent} from './component/blog/blog.component';
import {FormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {CommentComponent} from './component/comment/comment.component';
import {CommentService} from './service/comment.service';
import {StripHtmlPipe} from './helper/strip-html.pipe';
import {TrimHtmlPipe} from './helper/trim-html.pipe';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {CommentFilterComponent} from './component/comment-filter/comment-filter.component';
import {ArticleComponent} from './component/article/article.component';
import {ArticleService} from "./service/article.service";

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'auth0',
    component: Auth0Component
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthService]
  },
  {
    path: 'blog/:hash/articles',
    component: ArticleComponent,
    canActivate: [AuthService]
  },
  {
    path: 'comment',
    component: CommentComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    component: SiteNotFoundComponent
  }
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
    CommentComponent,
    StripHtmlPipe,
    TrimHtmlPipe,
    CommentFilterComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    NgbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getToken,
        whitelistedDomains: ['localhost:8000']
      }
    }),
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    AuthService,
    BlogInformationService,
    CommentService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
