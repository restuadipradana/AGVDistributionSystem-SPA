import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { ListPO } from './../_models/list-po';
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
    const url = this.baseUrl + 'generateqr/generate';
    return this.http.post(url, {dataTablesParam: data}, {});
  }
}
