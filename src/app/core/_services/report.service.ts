import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  transactionReportTxt(range: any) {
    return this.http.post(this.baseUrl + 'report/transaction-report', range, {responseType: 'blob' })
  }
}
