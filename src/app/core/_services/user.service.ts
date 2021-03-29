import { RoleByUser } from './../_models/role-by-user';
import { UserLogged } from './../_models/user-logged';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllUser(){
    return this.http.get<any>(this.baseUrl + 'user/user-list',  this.getToken() )
  }

  checkUser(account: string){
    return this.http.get<any>(this.baseUrl + 'user/user-check/' + account, this.getToken())
  }

  getRoleByUser(account: string) {
    return this.http.get<RoleByUser[]>(this.baseUrl + 'user/roleuser/' + account, this.getToken());
  }

  updateRoleByUser(account: string, listRoleByUser: RoleByUser[]) {
    return this.http.post(this.baseUrl + 'user/roleuser/' + account, listRoleByUser, this.getToken());
  }

  getToken() { //send token header for request to authorized cpntoler
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + localStorage.getItem("tokenSmartTooling"),
      }),
    };
    return httpOptions;
  }
}
