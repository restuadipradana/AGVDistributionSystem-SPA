import { KanbanService } from './../../../core/_services/kanban.service';
import { ListBuilding } from './../../../core/_models/list-building';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.css']
})
export class BuildingViewComponent implements OnInit {

  allDataBuilding: ListBuilding[];

  constructor(private router: Router, private _kabanSvc: KanbanService) { }

  ngOnInit(): void {
    this.getData();
  }

  showLine(buildingNumber){
    this.router.navigate(['/kanban/building/'+buildingNumber]);
  }

  getData(){
    this._kabanSvc.getBuildingData().subscribe(
      (res: any) => {
        this.allDataBuilding = res;
        //console.log("all dt" , this.allDataBuilding);
      },
      (error) => {
        console.log("Error: " , error.error);
      }
    );
  }

}
