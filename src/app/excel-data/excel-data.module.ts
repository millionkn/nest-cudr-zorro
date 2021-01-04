import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { NzButtonModule, NzMessageModule, NzIconModule } from 'ng-zorro-antd';
import { LanguageModule } from '../language/language.module';



@NgModule({
  declarations: [
    ExcelImportComponent,
  ],
  imports: [
    LanguageModule,
    NzButtonModule,
    NzMessageModule,
    NzIconModule,
    CommonModule
  ],
  exports: [
    ExcelImportComponent,
  ],
})
export class ExcelDataModule { }
