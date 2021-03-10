import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanRoutingModule } from './scan-routing.module';
import { ScanReadyComponent } from './scan-ready/scan-ready.component';
import { ScanAgvComponent } from './scan-agv/scan-agv.component';
import { ScanDirective } from './scan.directive';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [ScanReadyComponent, ScanAgvComponent, ScanDirective],
  imports: [
    CommonModule,
    FormsModule,
    ScanRoutingModule,
    AlertModule.forRoot()
  ]
})
export class ScanModule { }
