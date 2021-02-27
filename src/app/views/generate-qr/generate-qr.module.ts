import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateQrRoutingModule } from './generate-qr-routing.module';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';


@NgModule({
  declarations: [GenerateQrComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    GenerateQrRoutingModule

  ]
})
export class GenerateQrModule { }
