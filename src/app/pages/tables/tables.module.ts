import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { UserTableComponent } from './user-table/user-table.component';
import { BuildingViewComponent } from './building-view/building-view.component';
import { NzLayoutModule, NzMenuModule, NzIconModule, NzCardModule, NzDatePickerModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from './tables.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { LogsComponent } from './logs/logs.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    UserTableComponent,
    BuildingViewComponent,
    TablesComponent,
    LogsComponent,
  ],
  imports: [
    NzDatePickerModule,
    NzInputNumberModule,
    NzTimePickerModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    FormsModule,
    TablePageModule,
    TablesRoutingModule,
    CommonModule
  ],
})
export class TablesModule { }
