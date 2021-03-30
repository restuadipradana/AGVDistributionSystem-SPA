import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { NBuildingComponent } from './views/new-kanban/n-building/n-building.component';
import { NCellComponent } from './views/new-kanban/n-cell/n-cell.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './core/_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'building',
    component: NBuildingComponent,
    data: {
      title: 'Building'
    }
  },
  {
    path: 'building/:building',
    component: NCellComponent,
    data: {
      title: 'Cell'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        canActivate: [AuthGuard],
        path: 'user',
        loadChildren: () => import('./views/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'scan',
        loadChildren: () => import('./views/scan/scan.module').then(m => m.ScanModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'generate',
        loadChildren: () => import('./views/generate-qr/generate-qr.module').then(m => m.GenerateQrModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'kanban',
        loadChildren: () => import('./views/kanban/kanban.module').then(m => m.KanbanModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        runGuardsAndResolvers: 'always',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
