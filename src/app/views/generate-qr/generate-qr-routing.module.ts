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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateQrRoutingModule { }
