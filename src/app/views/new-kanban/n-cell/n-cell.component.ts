import { ListQRCode } from './../../../core/_models/list-qr';
import { ListCell } from './../../../core/_models/list-cell';
import { KanbanService } from './../../../core/_services/kanban.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-n-cell',
  templateUrl: './n-cell.component.html',
  styleUrls: ['./n-cell.component.css']
})
export class NCellComponent implements OnInit {

  buildingNumber:string="";

  allDataCell: ListCell[];
  cell1prep: ListQRCode;
  cell2prep: ListQRCode;
  cell3prep: ListQRCode;
  cell4prep: ListQRCode;
  cell5prep: ListQRCode;
  cell6prep: ListQRCode;
  cell7prep: ListQRCode;
  cell8prep: ListQRCode;
  cell9prep: ListQRCode;
  cell10prep: ListQRCode;
  cell11prep: ListQRCode;
  cell12prep: ListQRCode;
  cell13prep: ListQRCode;
  cell14prep: ListQRCode;
  cell1sti: ListQRCode;
  cell2sti: ListQRCode;
  cell3sti: ListQRCode;
  cell4sti: ListQRCode;
  cell5sti: ListQRCode;
  cell6sti: ListQRCode;
  cell7sti: ListQRCode;
  cell8sti: ListQRCode;
  cell9sti: ListQRCode;
  cell10sti: ListQRCode;
  cell11sti: ListQRCode;
  cell12sti: ListQRCode;
  cell13sti: ListQRCode;
  cell14sti: ListQRCode;

  intervalId: number;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _kabanSvc: KanbanService) { }

  ngOnInit(): void {
    this.buildingNumber = this.route.snapshot.params['building'];
    this.getData(this.buildingNumber);

    const source = interval(30000);
    this.subscription = source.subscribe(val => this.getData(this.buildingNumber));

  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  getData(buildingNo: string){
    this._kabanSvc.getKanbanData(buildingNo).subscribe(
      (res: any) => {
        this.allDataCell = res;
        //console.log("all dt" , this.allDataCell);
        this.splitData(this.allDataCell);
      },
      (error) => {
        console.log("Error: " , error.error);
      }
    );

  }

  splitData(data: ListCell[]){
    this.cell1prep = (data[0].cell_1.filter(t=>t.kind === 'PREP'))[0];
    this.cell2prep = (data[0].cell_2.filter(t=>t.kind === 'PREP'))[0];
    this.cell3prep = (data[0].cell_3.filter(t=>t.kind === 'PREP'))[0];
    this.cell4prep = (data[0].cell_4.filter(t=>t.kind === 'PREP'))[0];
    this.cell5prep = (data[0].cell_5.filter(t=>t.kind === 'PREP'))[0];
    this.cell6prep = (data[0].cell_6.filter(t=>t.kind === 'PREP'))[0];
    this.cell7prep = (data[0].cell_7.filter(t=>t.kind === 'PREP'))[0];
    this.cell8prep = (data[0].cell_8.filter(t=>t.kind === 'PREP'))[0];
    this.cell9prep = (data[0].cell_9.filter(t=>t.kind === 'PREP'))[0];
    this.cell10prep = (data[0].cell_A.filter(t=>t.kind === 'PREP'))[0];
    this.cell11prep = (data[0].cell_B.filter(t=>t.kind === 'PREP'))[0];
    this.cell12prep = (data[0].cell_C.filter(t=>t.kind === 'PREP'))[0];
    this.cell13prep = (data[0].cell_D.filter(t=>t.kind === 'PREP'))[0];
    this.cell14prep = (data[0].cell_E.filter(t=>t.kind === 'PREP'))[0];
    this.cell1sti = (data[0].cell_1.filter(t=>t.kind === 'STI'))[0];
    this.cell2sti = (data[0].cell_2.filter(t=>t.kind === 'STI'))[0];
    this.cell3sti = (data[0].cell_3.filter(t=>t.kind === 'STI'))[0];
    this.cell4sti = (data[0].cell_4.filter(t=>t.kind === 'STI'))[0];
    this.cell5sti = (data[0].cell_5.filter(t=>t.kind === 'STI'))[0];
    this.cell6sti = (data[0].cell_6.filter(t=>t.kind === 'STI'))[0];
    this.cell7sti = (data[0].cell_7.filter(t=>t.kind === 'STI'))[0];
    this.cell8sti = (data[0].cell_8.filter(t=>t.kind === 'STI'))[0];
    this.cell9sti = (data[0].cell_9.filter(t=>t.kind === 'STI'))[0];
    this.cell10sti = (data[0].cell_A.filter(t=>t.kind === 'STI'))[0];
    this.cell11sti = (data[0].cell_B.filter(t=>t.kind === 'STI'))[0];
    this.cell12sti = (data[0].cell_C.filter(t=>t.kind === 'STI'))[0];
    this.cell13sti = (data[0].cell_D.filter(t=>t.kind === 'STI'))[0];
    this.cell14sti = (data[0].cell_E.filter(t=>t.kind === 'STI'))[0];
    ////console.log("rest", this.cell8sti);
  }

}
