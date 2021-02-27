import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BuildingViewComponent } from './building-view/building-view.component';
import { LineViewComponent } from './line-view/line-view.component';


@NgModule({
  declarations: [BuildingViewComponent, LineViewComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
