import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BuildingViewComponent } from './building-view/building-view.component';
import { LineViewComponent } from './line-view/line-view.component';
import { BuildingViewV2Component } from './building-view-v2/building-view-v2.component';
import { LineViewV2Component } from './line-view-v2/line-view-v2.component';


@NgModule({
  declarations: [BuildingViewComponent, LineViewComponent, BuildingViewV2Component, LineViewV2Component],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
