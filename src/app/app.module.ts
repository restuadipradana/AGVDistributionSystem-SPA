import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './core/_services/auth.service';
import { AuthGuard } from './core/_guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { NBuildingComponent } from './views/new-kanban/n-building/n-building.component';
import { NCellComponent } from './views/new-kanban/n-cell/n-cell.component';

const ip = window.location.hostname;
const url = ip + ':5100'; //API Real
const urlt = ip + ':6900'; //API Test

export function tokenGetter() {
  return localStorage.getItem("tokenAGVdist");
}

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    NgxSpinnerModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //allowedDomains: ["localhost:5000"],
        //disallowedRoutes: ["localhost:5000/api/auth"],
        // allowedDomains: ['10.11.0.32:5100'],
        // disallowedRoutes: ['10.11.0.32:5100/api/auth'],
        allowedDomains: ["localhost:5000", url, urlt],
        disallowedRoutes: ["localhost:5000/api/auth", url+"/api/auth", urlt+"/api/auth"],
      },
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    NBuildingComponent,
    NCellComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    DatePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
