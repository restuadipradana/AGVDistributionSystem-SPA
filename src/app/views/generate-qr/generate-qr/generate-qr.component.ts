import { GenerateQrService } from './../../../core/_services/generate-qr.service';
import { ListPO } from './../../../core/_models/list-po';
import { SearchCriteriaDT } from '../../../core/_models/dtModels/datatable';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit {
  listPOs: ListPO[];
  listPOx: ListPO[];
  listPO: any = {};
  poo: string;
  modelo: string;
  lineo: string;
  packdata: any = {};

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };
  //dtOptions: any = {};
  selectedItemsList = [];
  checkedPrepIDs: ListPO[];
  checkedStiIDs: ListPO[];

  isCkAllPrep:boolean;
  isCkAllSti:boolean;
  checkedCategoryList:any;

  constructor(private generateQrSvc: GenerateQrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.isCkAllPrep = false;
    this.isCkAllSti = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        //console.log("st")
        dataTablesParameters.searchCriteria = this.searchCriteria;
        //console.log(dataTablesParameters)
        //console.log("dt")
        this.generateQrSvc.search(dataTablesParameters)
          .subscribe(resp => {
            this.listPOs = resp.data;
            this.spinner.hide();
            //console.log(resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'cellName', 'orderable': false },
        { data: 'style_Name', 'orderable': false },
        { data: 'article', 'orderable': false },
        { data: 'mo_No', 'orderable': false },
        { data: 'po', 'orderable': false },
        { data: 'qty', 'orderable': false },
        { data: 'prepStatId', 'orderable': false },
        { data: 'stiStatId', 'orderable': false }
      ],
      //order: [0, 'asc'],
      autoWidth: false
    };
    //this.fetchSelectedItems();
    //this.fetchCheckedIDs();

  }

  clickRow(dataclicked: ListPO){
    //console.log("click ", dataclicked.po);

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    //console.log(1)
  }

  rerender(): void {
    //console.log("sc po: ", this.poo);
    //console.log("sc model: ", this.modelo);
    //console.log("sc line: ", this.lineo);
    this.searchCriteria.isPageLoad = false;
    this.searchCriteria.filter = this.poo;
    this.searchCriteria.filter2 = this.modelo;
    this.searchCriteria.filter3 = this.lineo;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  search() {
    this.rerender();
  }

  changeSelection(kind: number) {
    switch(kind)
    {
      case 1:
        this.fetchSelectedPrepItems()
        break;
      case 2:
        this.fetchSelectedStiItems()
        break;
      default:
        console.log("gaada data kind ck bx")
        break;
    }

  }

  fetchSelectedPrepItems() { //chk box prep
    //console.log("fsi prep");
    this.selectedItemsList = this.listPOs.filter((value, index) => {
      //console.log(value.isPrepCheck);
      return value.isPrepCheck
    });
    console.log(this.selectedItemsList);
  }

  fetchSelectedStiItems() { //chk box sti
    //console.log("fsi sti");
    this.selectedItemsList = this.listPOs.filter((value, index) => {
      //console.log(value.isStiCheck);
      return value.isStiCheck
    });
    console.log(this.selectedItemsList);
  }

  fetchCheckedIDs() { //generate btn
    this.spinner.show();
    this.checkedPrepIDs = [];
    this.checkedStiIDs = [];
    this.listPOs.forEach((value) => {
      //console.log(value);
      if (value.isPrepCheck && (value.prepStatId == null || value.prepStatId == "")) {
        this.checkedPrepIDs.push(value);
      }
      if (value.isStiCheck && (value.stiStatId == null || value.stiStatId == "")) {
        this.checkedStiIDs.push(value);
      }
    });
    this.packdata.prep = this.checkedPrepIDs;
    this.packdata.sti = this.checkedStiIDs;
    this.checkedCategoryList = JSON.stringify(this.packdata);

    this.generateQrSvc.gen(this.packdata).subscribe(
      () => {
        //console.log("sukses");
        this.packdata = {};
        this.spinner.hide();
        //reload data w/o reset paging
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload(null, false);
        })
      },
      (error) => {
        console.log(error.error);
        this.spinner.hide();
      }
    );


  }

  checkUncheckAll(kind: number) { //ck all by kind; 1 = prep, 2 = sti
    switch(kind)
    {
      case 1:
        for (var i = 0; i < this.listPOs.length; i++) {
          this.listPOs[i].isPrepCheck = this.isCkAllPrep;
        }
        break;
      case 2:
        for (var i = 0; i < this.listPOs.length; i++) {
          this.listPOs[i].isStiCheck = this.isCkAllSti;
        }
        break;
      default:
        console.log("gaada data kind")
        break;
    }

    //this.fetchCheckedIDs();
  }
}
