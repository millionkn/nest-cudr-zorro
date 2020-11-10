import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  openIndex = 1;
  constructor(
    @Inject(LoginService) private loginService: LoginService,
  ) { }
  async ngOnInit() {
  }
}
