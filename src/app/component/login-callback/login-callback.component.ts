import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html'
})
export class LoginCallbackComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }

  ngOnInit() {
  }

}
