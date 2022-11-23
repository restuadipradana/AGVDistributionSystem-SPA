import { Component, OnInit } from '@angular/core';
import { ScanService } from './../../../core/_services/scan.service';

@Component({
  selector: 'app-scan-agv',
  templateUrl: './scan-agv.component.html',
  styleUrls: ['./scan-agv.component.css']
})

export class ScanAgvComponent implements OnInit {

  scanQr: string;
  scannedQr: any = {};
  alertsDismiss: any = [];

  constructor(private _scanSvc: ScanService) { }

  ngOnInit(): void {

  }

  searchqr(){
    //console.log(this.scanQr);
    if(this.scanQr != null || this.scanQr == '')
    {
      this._scanSvc.scanDelivery(this.scanQr).subscribe(
        (res: any) => {
          this.scannedQr = res;
          //console.log(this.scannedQr);
          this.showAlert( "OK!" , 1);
        },
        (error) => {
          console.log("Error: " , error.error.text);
          this.showAlert(error.error.text, 2);
        }
      );
      this.scanQr = '';
    }
  }

  showAlert(message: any, kind: number) {
    switch(kind) {
      case 1: {
        this.alertsDismiss.push({
          type: 'success',
          msg: `OK - ${new Date().toLocaleTimeString()}`,
          timeout: 10000
        });
        break;
      }
      case 2: {
        this.alertsDismiss.push({
          type: 'danger',
          msg: message,
          timeout: 8000
        });
        break;
      }
      default: {
         //statements;
        break;
      }
    }

  }

}
