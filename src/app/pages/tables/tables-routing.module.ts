import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { BuildingViewComponent } from './building-view/building-view.component';

const routes: Routes = [
  { path: '首页', component: UserTableComponent },
  { path: 'building-view', component: BuildingViewComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
