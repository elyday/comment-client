import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class AuthService {
  private oktaAuth = new OktaAuth({
    url: 'https://dev-889140.oktapreview.com',
    clientId: '0oaewv5hq7U2hgDZL0h7',
    issuer: 'https://dev-889140.oktapreview.com/oauth2/default',
    redirectUri: 'http://localhost:4200/callback',
  });

  constructor(private router: Router) {
  }

  isAuthenticated() {
    return !!this.oktaAuth.tokenManager.get('accessToken');
  }

  login() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    const tokens = await this.oktaAuth.token.parseFromUrl();
    tokens.forEach(token => {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    });
    this.router.navigate(['/dashboard']);
  }

  async logout() {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
  }

}
