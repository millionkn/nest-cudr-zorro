import { Component, OnInit, Inject } from '@angular/core';
import { modelConfig } from '../../modelData';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  constructor(
    @Inject(Router) private router: Router,
    @Inject(HttpClient) private http: HttpClient,
  ) { }
  data = [];
  async ngOnInit() {
    this.http.post<{ config: string }>(`http://120.53.18.141:3002/api/user-config`, {}).subscribe(({config})=>{
      this.data = eval(config);
    });
  }
  show(item: {
    id: string;
    mid: string;
  }) {
    this.router.navigate([`/tables/building-view`], { queryParams: { modelId: item.id } });
  }
  showLogs(item: {
    id: string;
    mid: string;
  }) {
    this.router.navigate([`/tables/logs`], { queryParams: { modelId: item.id } });
  }
}
