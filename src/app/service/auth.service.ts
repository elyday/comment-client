import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService implements CanActivate {

  auth0 = new auth0.WebAuth({
    clientID: 'HP1oF870PAPrSA7VAOU3kN8H9C37ljtk',
    domain: 'comment-server.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://comment-server.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/dashboard',
    scope: 'openid'
  });

  constructor(public router: Router) {
  }

  static getToken(): string {
    return localStorage.getItem('access_token');
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
