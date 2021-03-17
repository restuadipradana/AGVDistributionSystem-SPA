import { ProcessStat } from './../../../core/_models/processstat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GenerateQrService } from './../../../core/_services/generate-qr.service';
import { SearchCriteriaDT } from '../../../core/_models/dtModels/datatable';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('printModalP') public printModalP: ModalDirective;
  @ViewChild('deleteModalP') public deleteModalP: ModalDirective;
  @ViewChild('printModalS') public printModalS: ModalDirective;
  @ViewChild('deleteModalS') public deleteModalS: ModalDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };
  searchCriteria1: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };

  listPrep: ProcessStat[];
  listSti: ProcessStat[];
  cellP: string;
  cellS: string;
  selectedPrepId: string;
  selectedStiId: string;
  selectedDataPrep: ProcessStat;
  flags: string = 'XX';

  constructor(private generateQrSvc: GenerateQrService) { }

  ngOnInit(): void {
    this.flags = 'XY';
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        console.log("st")
        dataTablesParameters.searchCriteria = this.searchCriteria;
        console.log(dataTablesParameters)
        console.log("dt")
        this.generateQrSvc.listPrep(dataTablesParameters)
          .subscribe(resp => {
            this.listPrep = resp.data;
            console.log(resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'qrcode', 'orderable': false },
        { data: 'cell', 'orderable': true }
      ],
      order: [1, 'asc'],
      autoWidth: false
    };

    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        console.log("st")
        dataTablesParameters.searchCriteria = this.searchCriteria1;
        console.log(dataTablesParameters)
        console.log("dt")
        this.generateQrSvc.listSti(dataTablesParameters)
          .subscribe(resp => {
            this.listSti = resp.data;
            console.log(resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'qrcode', 'orderable': false },
        { data: 'cell', 'orderable': true }
      ],
      order: [1, 'asc'],
      autoWidth: false
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    console.log(1)
  }

  rerender(): void {
    this.searchCriteria.isPageLoad = false;
    this.searchCriteria.filter = this.cellP;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  clickRow(dataclicked: ProcessStat){
    console.log(dataclicked);
    this.selectedPrepId = dataclicked.id;
    this.selectedDataPrep = dataclicked;

  }

}
