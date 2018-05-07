import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  oktaAuth;
  authenticated;

  constructor(private okta: AuthService, private router: Router) {
    this.authenticated = okta.isAuthenticated();
    this.oktaAuth = okta;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) {
      return true;
    }

    // Redirect to login flow.
    this.router.navigate(['/login']);
    return false;
  }
}
