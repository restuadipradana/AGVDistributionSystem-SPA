import { AuthService } from './../../core/_services/auth.service';
import { UserService } from './../../core/_services/user.service';
import {Component, ViewChild} from '@angular/core';
import { NavItem } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];
  currentUser: any = JSON.parse(localStorage.getItem('userAGVdist'));


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private nav: NavItem) {
      this.navItems = this.nav.getNav(this.currentUser); //ke nav_
    }

  logout() {
    localStorage.removeItem('tokenAGVdist');
    localStorage.removeItem('userAGVdist');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/login']);
  }
}
