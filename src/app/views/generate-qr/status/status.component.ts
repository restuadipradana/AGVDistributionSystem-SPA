import { ListQRCode } from './../../../core/_models/list-qr';
import { ProcessStat } from './../../../core/_models/processstat';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
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
export class StatusComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('printModal') public printModal: ModalDirective;
  @ViewChild('deleteModalP') public deleteModalP: ModalDirective;
  @ViewChild('deleteModalS') public deleteModalS: ModalDirective;
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>; //gatau biar bisa rerender multiple table
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };
  searchCriteria1: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };

  listPrep: ListQRCode[];
  listSti: ListQRCode[];
  cellP: string;
  cellS: string;
  selectedPrepId: string;
  selectedStiId: string;
  selectedData: ListQRCode;
  selectedQr: string;
  flags: string = 'XX';
  isPrepChkAll: boolean;
  isStiChkAll: boolean;
  selectedItemsList = [];
  checkedList: ListQRCode[];
  packdata: any = {};


  constructor(private generateQrSvc: GenerateQrService) { }

  ngOnInit(): void {
    this.isPrepChkAll = false;
    this.isStiChkAll = false;
    this.flags = 'XY';
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria;
        this.generateQrSvc.listPrep(dataTablesParameters)
          .subscribe(resp => {
            this.listPrep = resp.data;
            //console.log(resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'pOlist', 'orderable': false },
        { data: 'cell', 'orderable': true },
        { data: 'generateAt', 'orderable': false },
        { data: 'status', 'orderable': false }
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
        dataTablesParameters.searchCriteria = this.searchCriteria1;
        this.generateQrSvc.listSti(dataTablesParameters)
          .subscribe(resp => {
            this.listSti = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'pOlist', 'orderable': false },
        { data: 'cell', 'orderable': true },
        { data: 'generateAt', 'orderable': false },
        { data: 'status', 'orderable': false }
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
    this.searchCriteria1.isPageLoad = false;
    this.searchCriteria1.filter = this.cellS;
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    });
  }

  clickRow(dataclicked: ListQRCode){
    console.log("click ", dataclicked);
    this.selectedPrepId = dataclicked.id;
    this.selectedData = dataclicked;
    this.selectedData.totQty = dataclicked.pOlist.reduce((acc, val) => acc += val.qty, 0);
  }

  printData(dataclicked: ListQRCode){
    this.printModal.hide();
  }

  deleteData(kind: string, data: ListQRCode){
    if(kind == 'P')
    {
      this.generateQrSvc.deleteQrPrep(data).subscribe(() => {
        this.deleteModalP.hide();
        this.dtElements.forEach((dtElement: DataTableDirective) => {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload(null, false);
          });
        });
      }, error => {
        console.log(error.error);
      });
    }
    else if (kind == 'S')
    {
      this.generateQrSvc.deleteQrSti(data).subscribe(() => {
        this.deleteModalS.hide();
        this.dtElements.forEach((dtElement: DataTableDirective) => {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload(null, false);
          });
        });
      }, error => {
        console.log(error.error);
      });
    }
  }

  // ================= for generate excel==================

  fetchSelectedPrepItems() { //chk box prep
    //console.log("fsi prep");
    this.selectedItemsList = this.listPrep.filter((value, index) => {
      //console.log(value.isPrepCheck);
      return value.isCheck;
    });
    console.log(this.selectedItemsList);
  }

  fetchSelectedStiItems() { //chk box sti
    //console.log("fsi sti");
    this.selectedItemsList = this.listSti.filter((value, index) => {
      //console.log(value.isStiCheck);
      return value.isCheck
    });
    console.log(this.listSti);
  }

  checkUncheckAll(kind: number) { //ck all by kind; 1 = prep, 2 = sti
    switch(kind)
    {
      case 1:
        for (var i = 0; i < this.listPrep.length; i++) {
          this.listPrep[i].isCheck = this.isPrepChkAll;
        }
        break;
      case 2:
        for (var i = 0; i < this.listSti.length; i++) {
          this.listSti[i].isCheck = this.isStiChkAll;
        }
        break;
      default:
        console.log("gaada data kind")
        break;
    }
  }

  fetchCheckedIDs() { //generate btn

    this.checkedList = [];
    this.listPrep.forEach((value) => {
      console.log(value);
      if (value.isCheck) {
        value.totQty = value.pOlist.reduce((acc, val) => acc += val.qty, 0);
        this.checkedList.push(value);
      }
    });
    this.listSti.forEach((value) => {
      console.log(value);
      if (value.isCheck) {
        value.totQty = value.pOlist.reduce((acc, val) => acc += val.qty, 0);
        this.checkedList.push(value);
      }
    });
    this.packdata.selectedData = this.checkedList;

    this.generateQrSvc.exportExcel(this.packdata);
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    });


  }

}
