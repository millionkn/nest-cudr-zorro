import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
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
