import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { BuildingViewComponent } from './building-view/building-view.component';
import { TablesComponent } from './tables.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      { path: 'users', component: UserTableComponent },
      { path: 'building-view', component: BuildingViewComponent },
      { path: 'logs', component: LogsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
