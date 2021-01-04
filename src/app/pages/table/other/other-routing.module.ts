import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WindTypeTableComponent } from './wind-type-table/wind-type-table.component';
import { MovieUrlTableComponent } from './movie-url-table/movie-url-table.component';

const routes: Routes = [
  { path: '影像记录', component: MovieUrlTableComponent },
  { path: '风向标形态', component: WindTypeTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRoutingModule { }
