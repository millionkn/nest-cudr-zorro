import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { OtherRoutingModule } from './other-routing.module';
import { WindTypeTableComponent } from './wind-type-table/wind-type-table.component';
import { MovieUrlTableComponent } from './movie-url-table/movie-url-table.component';



@NgModule({
  declarations: [
    MovieUrlTableComponent,
    WindTypeTableComponent,
  ],
  imports: [
    TablePageModule,
    OtherRoutingModule,
    CommonModule
  ]
})
export class OtherModule { }
