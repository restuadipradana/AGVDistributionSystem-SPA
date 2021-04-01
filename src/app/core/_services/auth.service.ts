import { UserLogged } from './../_models/user-logged';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: UserLogged;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('tokenAGVdist', user.token);
          localStorage.setItem('userAGVdist', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      }),
    );
  }

  loggedIn() {
    const token = localStorage.getItem('tokenAGVdist');
    const curentUser  = JSON.parse(localStorage.getItem("userAGVdist"));
    if(curentUser==null || curentUser.role == undefined)
    {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
