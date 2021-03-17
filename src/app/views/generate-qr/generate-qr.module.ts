import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { GenerateQrRoutingModule } from './generate-qr-routing.module';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { StatusComponent } from './status/status.component';


@NgModule({
  declarations: [GenerateQrComponent, StatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    GenerateQrRoutingModule,
    ModalModule.forRoot(),
    TabsModule

  ]
})
export class GenerateQrModule { }
