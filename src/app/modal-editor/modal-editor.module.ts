import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ModalEditorService } from './modal-editor.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { StringEditorComponent } from './editors/string-editor/string-editor.component';
import { ItemEditorComponent } from './editors/item-editor/item-editor.component';
import { BoolEditorComponent } from './editors/bool-editor/bool-editor.component';
import { ModalBinderFactoryService } from './modal-binder-factory.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NumberEditorComponent } from './editors/number-editor/number-editor.component';
import { DateEditorComponent } from './editors/date-editor/date-editor.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    DateEditorComponent,
    TableEditorComponent,
    StringEditorComponent,
    ItemEditorComponent,
    BoolEditorComponent,
    NumberEditorComponent,
  ],
  imports: [
    NzDatePickerModule,
    NzInputNumberModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    DateEditorComponent,
    NumberEditorComponent,
    StringEditorComponent,
    ItemEditorComponent,
    BoolEditorComponent,
  ],
  providers: [
    ModalEditorService,
    ModalBinderFactoryService,
  ],
})
export class ModalEditorModule { }
