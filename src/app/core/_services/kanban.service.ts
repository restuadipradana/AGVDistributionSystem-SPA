import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKanbanData(building: string){
    return this.http.get<any>(this.baseUrl + 'kanban/cell-kanban', { params:{building:building}})
  }

}
