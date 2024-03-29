import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsManTableComponent } from './sports-man-table/sports-man-table.component';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { BaseRoutingModule } from './base-routing.module';
import { FieldTableComponent } from './field-table/field-table.component';
import { AnemometerTableComponent } from './anemometer-table/anemometer-table.component';
import { NzMessageModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [
    SportsManTableComponent,
    FieldTableComponent,
    AnemometerTableComponent,
  ],
  imports: [
    NzMessageModule,
    TablePageModule,
    BaseRoutingModule,
    CommonModule
  ]
})
export class BaseModule { }
