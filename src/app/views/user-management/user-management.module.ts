import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserAuthorizationComponent } from './user-authorization/user-authorization.component';


@NgModule({
  declarations: [UserAuthorizationComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class UserManagementModule { }
