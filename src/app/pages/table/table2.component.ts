import { Component, OnInit, Inject } from '@angular/core';
import { LanguageService } from 'src/app/language/language.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.scss']
})
export class Table2Component implements OnInit {
  isCollapsed = false;
  openIndex = 1;
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(LanguageService) private language: LanguageService,
    private router: Router,
  ) { }
  async ngOnInit() {
  }
  changeLanguage(to: '中文' | 'english') {
    this.language.change(to);
  }
  logout() {
    this.http.post(`/api/auth/logout`, {}).toPromise()
    this.router.navigate(['/']);
  }
}
