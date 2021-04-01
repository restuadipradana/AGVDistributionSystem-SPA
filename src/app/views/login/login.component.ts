import { AuthService } from './../../core/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  user: any = {};
  isWrong: boolean;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    if (this.authService.loggedIn) this.router.navigate(["/dashboard"]);
    this.isWrong = false;
  }

  login() {
    //console.log(this.user);
    this.authService.login(this.user).subscribe(
      next => {
      },
      error => {
        console.log("yah ero", error)
        this.isWrong = true;
      },
      () => {
        this.router.navigate(["/dashboard"]);
      }
    );
  }
}
