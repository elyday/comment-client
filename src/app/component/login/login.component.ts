import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    if (auth.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
