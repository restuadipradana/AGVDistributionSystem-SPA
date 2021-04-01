import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  scanReady(scanQr: string){
    //console.log("Scanned: ", scanQr);
    return this.http.get<any>(this.baseUrl + 'scan/scanready', { params:{scanQr:scanQr}, headers: this.getToken().headers})
  }

  scanDelivery(scanQr: string){
    //console.log("Scanned: ", scanQr);
    return this.http.get<any>(this.baseUrl + 'scan/scandelivery', { params:{scanQr:scanQr}, headers: this.getToken().headers})
  }

  getStiStat(){
    return this.http.get<any>(this.baseUrl + 'scan/getstistat-today')
  }

  getPrepStat(){
    return this.http.get<any>(this.baseUrl + 'scan/getprepstat-today')
  }

  getToken() { //send token header for request to authorized cpntoler
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + localStorage.getItem("tokenAGVdist"),
      }),
    };
    return httpOptions;
  }


}
