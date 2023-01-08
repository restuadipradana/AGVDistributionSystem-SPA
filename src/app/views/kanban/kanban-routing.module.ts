import { LineViewV2Component } from './line-view-v2/line-view-v2.component';
import { BuildingViewV2Component } from './building-view-v2/building-view-v2.component';
import { LineViewComponent } from './line-view/line-view.component';
import { BuildingViewComponent } from './building-view/building-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Kanban'
    },
    children: [
      {
        path: '',
        component: BuildingViewComponent,
        data: {
          title: 'Building Kanban'
        }
      },
      {
        path: 'building/:building',
        component: LineViewComponent,
        data: {
          title: 'Cell Kanban'
        }
      },
      {
        path: 'v2',
        component: BuildingViewV2Component,
        data: {
          title: 'Building Kanban'
        }
      },
      {
        path: 'v2/:building',
        component: LineViewV2Component,
        data: {
          title: 'Cell Kanban'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
