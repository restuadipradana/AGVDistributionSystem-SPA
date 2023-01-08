import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ReportRoutingModule } from './report-routing.module';
import { TransacReportComponent } from './transac-report/transac-report.component';
import { InquiryReportComponent } from './inquiry-report/inquiry-report.component';


@NgModule({
  declarations: [TransacReportComponent, InquiryReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReportRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    CollapseModule.forRoot()
  ]
})
export class ReportModule { }
