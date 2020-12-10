import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { TablePageModule } from 'src/app/shareModules/table-page/table-page.module';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UserTableComponent,
  ],
  imports: [
    TablePageModule,
    UsersRoutingModule,
    CommonModule
  ]
})
export class UsersModule { }
