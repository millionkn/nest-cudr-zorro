import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { NzButtonModule, NzCardModule, NzStatisticModule } from 'ng-zorro-antd';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
  ],
  imports: [
    NzCardModule,
    NzStatisticModule,
    NzDropDownModule,
    NzButtonModule,
    TablePageModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    FormsModule,
    TableRoutingModule,
    CommonModule
  ],
})
export class TableModule { }
