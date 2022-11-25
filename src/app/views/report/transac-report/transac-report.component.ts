import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/_services/report.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transac-report',
  templateUrl: './transac-report.component.html',
  styleUrls: ['./transac-report.component.css']
})
export class TransacReportComponent implements OnInit {

  alertsDismiss: any = [];
  daterangepickerModel?: Date[] = null
  dateRange: any = {startDate: null, endDate: null}

  constructor(private _reportSvc: ReportService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

  }

  download() {
    if (this.daterangepickerModel === null) {
      this.showError('Enter the date range field!')
      return
    }
    this.dateRange.startDate = new Date(this.daterangepickerModel[0].setHours(0,0,0,0))
    this.dateRange.endDate = new Date(this.daterangepickerModel[1].setHours(23,59,59,999))
    console.log(this.dateRange)
    this.spinner.show()
    this._reportSvc.transactionReportTxt(this.dateRange).subscribe(
      (result: Blob) => {
        const blob = new Blob([result]);
        if(blob.size <= 0) {
          this.showError('Not found data  ')
          this.spinner.hide()
          return
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'ds_upload.txt';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        this.spinner.hide()
        link.click();
      },
      (error) => {
        this.spinner.hide()
        console.log(error)
        this.showError('Something error: ' + error)
      }
    )
  }

  showError(message: any) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: message,
      timeout: 6000
    });
  }

}
