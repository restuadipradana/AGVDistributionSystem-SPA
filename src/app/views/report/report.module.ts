import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ReportRoutingModule } from './report-routing.module';
import { TransacReportComponent } from './transac-report/transac-report.component';


@NgModule({
  declarations: [TransacReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReportRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ]
})
export class ReportModule { }
