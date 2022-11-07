import { GenerateQrV2Component } from './generate-qr-v2/generate-qr-v2.component';
import { StatusComponent } from './status/status.component';
import { GenerateQrComponent } from './generate-qr/generate-qr.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Generate QR Code'
    },
    children: [
      {
        path: 'generate',
        component: GenerateQrComponent,
        data: {
          title: 'Create QR Code'
        }
      },
      {
        path: 'status',
        component: StatusComponent,
        data: {
          title: 'Status List'
        }
      },
      {
        path: 'generate-v2',
        component: GenerateQrV2Component,
        data: {
          title: 'Create QR Code V2'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateQrRoutingModule { }
