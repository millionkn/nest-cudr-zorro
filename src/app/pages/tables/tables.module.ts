import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  declarations: [
    UserTableComponent,
  ],
  imports: [
    TablePageModule,
    TablesRoutingModule,
    CommonModule
  ],
})
export class TablesModule { }
