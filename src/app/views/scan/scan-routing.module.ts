import { ScanAgvComponent } from './scan-agv/scan-agv.component';
import { ScanReadyComponent } from './scan-ready/scan-ready.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Scan'
    },
    children: [
      {
        path: 'scan-ready',
        component: ScanReadyComponent,
        data: {
          title: 'Scan Ready'
        }
      },
      {
        path: 'scan-agv',
        component: ScanAgvComponent,
        data: {
          title: 'Scan AGV'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanRoutingModule { }
