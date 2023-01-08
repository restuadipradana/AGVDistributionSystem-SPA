import { Component, OnInit } from '@angular/core';
import { KanbanService } from './../../../core/_services/kanban.service';
import { ListBuilding } from './../../../core/_models/list-building';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-building-view-v2',
  templateUrl: './building-view-v2.component.html',
  styleUrls: ['./building-view-v2.component.css']
})
export class BuildingViewV2Component implements OnInit {

  allDataBuilding: ListBuilding[];
  subscription: Subscription;
  chunkedData: any = []

  constructor(private router: Router, private _kabanSvc: KanbanService) { }

  ngOnInit(): void {
    this.getData()
  }

  showLine(buildingNumber){
    this.router.navigate(['/kanban/v2/'+buildingNumber]);
  }

  getData(){
    this._kabanSvc.getBuildingDataV2().subscribe(
      (res: any) => {
        this.allDataBuilding = res;
        this.chunkedData = this.chunkingDataToKanban(this.allDataBuilding, 6);
        console.log("chunked" , this.chunkingDataToKanban(this.allDataBuilding, 6));
        console.log("cekk" , res);
      },
      (error) => {
        console.log("Error: " , error.error);
      }
    );
  }

  chunkingDataToKanban(data: any, size: number) {
    var arrays = []
    for (let i = 0; i < data.length; i += size) {
      arrays.push(data.slice(i, i + size));
    }
    return arrays
  }

}
