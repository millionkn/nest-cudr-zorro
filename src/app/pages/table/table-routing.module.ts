import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { Table2Component } from './table2.component';

const routes: Routes = [
  {
    path: 'biathlon',
    component: TableComponent,
    children: [
      { path: '', redirectTo: 'base' },
      { path: 'base', loadChildren: () => import('./base/base.module').then((m) => m.BaseModule) },
      { path: 'log', loadChildren: () => import('./log/log.module').then((m) => m.LogModule) },
      { path: 'other', loadChildren: () => import('./other/other.module').then((m) => m.OtherModule) },
    ]
  },
  {
    path: 'skijump',
    component: Table2Component,
    children: [
      { path: '', redirectTo: 'base' },
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
