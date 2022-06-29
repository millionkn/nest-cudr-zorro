import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { LogRoutingModule } from './log-routing.module';
import { SportsManStateTableComponent } from './sports-man-state-table/sports-man-state-table.component';
import { WindLogTableComponent } from './wind-log-table/wind-log-table.component';
import { SkijumpGradeTableComponent } from './skijump-grade-table/skijump-grade-table.component';
import { BiathlonGradeTableComponent } from './biathlon-grade-table/biathlon-grade-table.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BiathlonGradeTabsComponent } from './biathlon-grade-tabs/biathlon-grade-tabs.component';
import { BiathlonGradeChart1Component } from './biathlon-grade-chart1/biathlon-grade-chart1.component';
import { ExcelDataModule } from 'src/app/excel-data/excel-data.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BiathlonGradeTable2Component } from './biathlon-grade-table2/biathlon-grade-table2.component';

@NgModule({
  declarations: [
    SportsManStateTableComponent,
    WindLogTableComponent,
    SkijumpGradeTableComponent,
    BiathlonGradeTableComponent,
    BiathlonGradeTabsComponent,
    BiathlonGradeChart1Component,
    BiathlonGradeTable2Component,
  ],
  imports: [
    NzTabsModule,
    TablePageModule,
    LogRoutingModule,
    ExcelDataModule,
    NzModalModule,
    CommonModule
  ]
})
export class LogModule { }
