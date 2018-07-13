import {Component} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthService, private titleService: Title) {
    auth.handleAuthentication();
    this.titleService.setTitle('Admin Comment Client');
  }
}
