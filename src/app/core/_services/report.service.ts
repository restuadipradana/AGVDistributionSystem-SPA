import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDT } from '../_models/dtModels/datatable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  transactionReportTxt(range: any) {
    return this.http.post(this.baseUrl + 'report/transaction-report', range, {responseType: 'blob' })
  }

  getSearchOptionParam(){
    return this.http.get<any>(this.baseUrl + 'report/get-inq-param')
  }

  getInquireReportList(dataTablesParam: any) {
    const url = this.baseUrl + 'report/inq-report-search';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  inquireReportExportExcel(param: any) {
    //console.log("param ", param)
    return this.http.post(this.baseUrl + 'report/exportExcel',param,{responseType: 'blob' })

  }


}
