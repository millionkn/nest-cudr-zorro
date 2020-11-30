import { Component, OnInit, Inject } from '@angular/core';
import { modelConfig } from '../../modelData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  constructor(
    @Inject(Router) private router: Router,
  ) { }
  data = modelConfig;
  async ngOnInit() {
    console.log(this.data)
  }
  show(item: {
    id: string;
    mid: string;
  }) {
    this.router.navigate([`/tables/building-view`], { queryParams: { modelId: item.id } })
  }
}
