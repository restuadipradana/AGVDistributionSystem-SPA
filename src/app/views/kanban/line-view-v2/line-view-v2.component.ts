import { Component, OnInit } from '@angular/core';
import { ListQRCode } from './../../../core/_models/list-qr';
import { KanbanService } from './../../../core/_services/kanban.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-line-view-v2',
  templateUrl: './line-view-v2.component.html',
  styleUrls: ['./line-view-v2.component.css']
})
export class LineViewV2Component implements OnInit {

  buildingNumber:string="";
  intervalId: number;
  subscription: Subscription;
  allData: PerCellData[];
  chunkedData: any = []

  constructor(private route: ActivatedRoute,
              private _kabanSvc: KanbanService) { }

  ngOnInit(): void {
    this.buildingNumber = this.route.snapshot.params['building'];
    this.getData(this.buildingNumber);
  }

  getData(buildingNo: string){
    this._kabanSvc.getKanbanDataV2(buildingNo).subscribe(
      (res: any) => {
        this.allData = res;
        this.chunkedData = this.chunkingDataToKanban(this.allData, 7)
        console.log("ceks" , this.allData);
        console.log("chunked" , this.chunkingDataToKanban(this.allData, 7));
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

export interface PerCellData {
  processStats: ListQRCode
  buildingNo: string
  buildingName: string
  line_ID: string
  line_Name: string
}
