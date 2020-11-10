import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalEditorModule } from 'src/app/modal-editor/modal-editor.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule, NzFormModule } from 'ng-zorro-antd';


@NgModule({
  imports: [
    NzSelectModule,
    NzIconModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzModalModule,
    NzDividerModule,
    NzLayoutModule,
    NzTableModule,
    NzButtonModule,
    ModalEditorModule,
    NzGridModule,
    CommonModule,
  ],
  exports: [
    NzSelectModule,
    NzIconModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzModalModule,
    NzDividerModule,
    NzLayoutModule,
    NzTableModule,
    NzButtonModule,
    ModalEditorModule,
    NzGridModule,
    CommonModule,
  ],
})
export class TablePageModule { }
