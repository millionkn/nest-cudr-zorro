import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsManStateTableComponent } from './sports-man-state-table/sports-man-state-table.component';
import { WindLogTableComponent } from './wind-log-table/wind-log-table.component';
import { SkijumpGradeTableComponent } from './skijump-grade-table/skijump-grade-table.component';
import { BiathlonGradeTabsComponent } from './biathlon-grade-tabs/biathlon-grade-tabs.component';


const routes: Routes = [
  { path: '', redirectTo: '体征参数', },
  { path: '体征参数', component: SportsManStateTableComponent },
  { path: '风环境', component: WindLogTableComponent },
  { path: '滑雪成绩', component: SkijumpGradeTableComponent },
  { path: '冬季两项', component: BiathlonGradeTabsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
