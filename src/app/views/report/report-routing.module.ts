import { InquiryReportComponent } from './inquiry-report/inquiry-report.component';
import { TransacReportComponent } from './transac-report/transac-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report'
    },
    children: [
      {
        path: 'transaction-report',
        component: TransacReportComponent,
        data: {
          title: 'Transaction Report'
        }
      },
      {
        path: 'inquiry-report',
        component: InquiryReportComponent,
        data: {
          title: 'Inquiry Report'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
