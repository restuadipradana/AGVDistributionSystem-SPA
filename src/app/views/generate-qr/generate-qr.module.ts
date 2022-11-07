import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPrintModule} from 'ngx-print';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';

import { GenerateQrRoutingModule } from './generate-qr-routing.module';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { StatusComponent } from './status/status.component';
import { GenerateQrV2Component } from './generate-qr-v2/generate-qr-v2.component';


@NgModule({
  declarations: [GenerateQrComponent, StatusComponent, GenerateQrV2Component],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    GenerateQrRoutingModule,
    ModalModule.forRoot(),
    TabsModule,
    NgxPrintModule,
    //NgxQRCodeModule,
    QRCodeModule

  ]
})
export class GenerateQrModule { }
