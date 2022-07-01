import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    children: [
      { path: '', redirectTo: '首页' },
      { path: '首页', component: HomeComponent },
      { path: 'base', loadChildren: () => import('./base/base.module').then((m) => m.BaseModule) },
      { path: 'log', loadChildren: () => import('./log/log.module').then((m) => m.LogModule) },
      { path: 'other', loadChildren: () => import('./other/other.module').then((m) => m.OtherModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
