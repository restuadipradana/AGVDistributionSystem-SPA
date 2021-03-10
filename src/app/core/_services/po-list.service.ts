import { ListPO } from './../_models/list-po';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
//------------this service is deprecated
@Injectable({
  providedIn: 'root'
})
export class PoListService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(dataTablesParam: any) {
    const url = this.baseUrl + 'test/po-list';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

}
