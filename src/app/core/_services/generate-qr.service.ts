import { ListQRCode } from './../_models/list-qr';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateQrService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(dataTablesParam: any) {
    const url = this.baseUrl + 'generateqr/po-list';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  gen(data: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + localStorage.getItem("tokenSmartTooling"),
      }),
    };
    const url = this.baseUrl + 'generateqr/generate';
    return this.http.post(url, {dataTablesParam: data}, httpOptions);
  }

  listPrep(dataTablesParam: any) {
    const url = this.baseUrl + 'generateqr/prep-list';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }
  listSti(dataTablesParam: any) {
    const url = this.baseUrl + 'generateqr/sti-list';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  deleteQrPrep(data: ListQRCode) {
    return this.http.post(this.baseUrl + 'generateqr/prep-delete', data);
  }

  deleteQrSti(data: ListQRCode) {
    return this.http.post(this.baseUrl + 'generateqr/sti-delete', data);
  }

  exportExcel(param: any) {
    console.log("param ", param)
    return this.http.post(this.baseUrl + 'generateqr/exportExcel',{dataParam: param},{responseType: 'blob' })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'ExcelQR' + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

}
