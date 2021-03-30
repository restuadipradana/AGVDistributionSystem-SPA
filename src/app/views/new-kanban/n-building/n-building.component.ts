import { Component, OnInit } from '@angular/core';
import { KanbanService } from './../../../core/_services/kanban.service';
import { ListBuilding } from './../../../core/_models/list-building';
import { Router } from '@angular/router';

@Component({
  selector: 'app-n-building',
  templateUrl: './n-building.component.html',
  styleUrls: ['./n-building.component.css']
})
export class NBuildingComponent implements OnInit {

  allDataBuilding: ListBuilding[];

  constructor(private router: Router, private _kabanSvc: KanbanService) { }

  ngOnInit(): void {
    this.getData();
  }

  showLine(buildingNumber){
    this.router.navigate(['/building/'+buildingNumber]);
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
