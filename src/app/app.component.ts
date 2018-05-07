import {Component} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
  }

  public checkActiveSite(path: string) {
    return path;
  }
}
