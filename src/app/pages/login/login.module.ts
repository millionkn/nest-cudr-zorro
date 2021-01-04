import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    NzRadioModule,
    ReactiveFormsModule,
    FormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzMessageModule,
    LoginRoutingModule,
    CommonModule
  ]
})
export class LoginModule { }
