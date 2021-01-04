import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsManTableComponent } from './sports-man-table/sports-man-table.component';
import { FieldTableComponent } from './field-table/field-table.component';
import { AnemometerTableComponent } from './anemometer-table/anemometer-table.component';

const routes: Routes = [
  { path: '', redirectTo: '运动员信息' },
  { path: '运动员信息', component: SportsManTableComponent },
  { path: '赛场信息', component: FieldTableComponent },
  { path: '测风仪', component: AnemometerTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
