import {Component} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'app';

  constructor(private auth: AuthService) {
    auth.handleAuthentication();
  }
}
