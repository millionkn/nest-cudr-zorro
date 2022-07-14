import { Component, OnInit, Inject } from '@angular/core';
import { LanguageService } from 'src/app/language/language.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  isCollapsed = false;
  openIndex = 1;
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(LanguageService) private language: LanguageService,
    @Inject(LoginService) private loginServ: LoginService,
    private router: Router,
  ) { }
  async ngOnInit() {
  }
  showWindType = this.loginServ.showWindType()
  gradeRoute = this.loginServ.gradeRoute()
  changeLanguage(to: '中文' | 'english') {
    this.language.change(to);
  }
  logout() {
    this.http.post(`/api/auth/logout`, {}).toPromise()
    this.router.navigate(['/']);
  }
}
