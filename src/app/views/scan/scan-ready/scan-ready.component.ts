import { DOCUMENT } from '@angular/common';
import { StatusQR } from './../../../core/_models/status-qr';
import { element } from 'protractor';
import { ListQRCode } from './../../../core/_models/list-qr';
import { ScanService } from './../../../core/_services/scan.service';
import { Component, OnInit, Directive, ElementRef, Inject } from '@angular/core';


@Component({
  selector: 'app-scan-ready',
  templateUrl: './scan-ready.component.html',
  styleUrls: ['./scan-ready.component.css']
})

export class ScanReadyComponent implements OnInit {

  scanQr: string;
  scannedQr: any = {};
  alertsDismiss: any = [];
  listQrPoSti: ListQRCode[];
  listQrPoPrep: ListQRCode[];

  constructor(private _scanSvc: ScanService, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.getStiStat();
    this.getPrepStat();
  }


  searchqr(){
    console.log(this.scanQr);
    if(this.scanQr != null || this.scanQr == '')
    {
      this._scanSvc.scanReady(this.scanQr).subscribe(
        (res: any) => {
          this.scannedQr = res;
          this.scanQr = '';
          this._document.defaultView.location.reload();
        },
        (error) => {
          console.log("Error: " , error.error.text);
          this.showError(error.error.text);
        }
      );


      this.scanQr = '';
    }
  }

  showError(message: any) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: message,
      timeout: 3000
    });
  }

  getStiStat(){
    this._scanSvc.getStiStat().subscribe(
      (res: any) => {
        this.listQrPoSti = res;
        //console.log(this.listQrPoSti);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showError(error.error.text);
      }
    );
  }

  getPrepStat(){
    this._scanSvc.getPrepStat().subscribe(
      (res: any) => {
        this.listQrPoPrep = res;
        //console.log(this.listQrPoPrep);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showError(error.error.text);
      }
    );
  }


}
