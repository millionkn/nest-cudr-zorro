import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  isCollapsed = false;
  openIndex = 1;
  constructor(
  ) { }
  async ngOnInit() {
  }
}
