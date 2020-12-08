import { Component, OnInit, Inject } from '@angular/core';
import { modelConfig } from '../../modelData';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  constructor(
    @Inject(Router) private router: Router,
  ) { }
  data = [
    { id: '1', mid: '北33' },
    { id: '2', mid: '北81' },
    { id: '3', mid: '北26' },
    { id: '4', mid: '北23' },
    { id: '5', mid: '北01' },
    { id: '6', mid: '北22' },
    { id: '7', mid: '北07' },
    { id: '8', mid: '北43' },
    { id: '9', mid: '北37' },
    { id: '10', mid: '北38' },
  ];
  async ngOnInit() {
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
