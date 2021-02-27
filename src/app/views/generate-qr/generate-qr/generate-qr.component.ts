import { ListPO } from './../../../core/_models/list-po';
import { PoListService } from './../../../core/_services/po-list.service';
import { SearchCriteriaDT } from '../../../core/_models/dtModels/datatable';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Person } from './person';
import { Router } from '@angular/router';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit {
  listPOs: ListPO[];
  listPO: any = {};
  poo: string;
  modelo: string;
  lineo: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };
  //dtOptions: any = {};
  //persons: Person[];
  //datsx: [];
  selectedItemsList = [];
  checkedIDs = [];

  constructor(private poListSvc: PoListService) { }

  ngOnInit(): void {
    console.log("ci")
    this.dtOptions = {
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
        this.poListSvc.search(dataTablesParameters)
          .subscribe(resp => {
            this.listPOs = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
            console.log(resp);
          });
      },
      columns: [
        { data: 'line', 'orderable': false },
        { data: 'style_Name', 'orderable': false },
        { data: 'article', 'orderable': false },
        { data: 'mo_No', 'orderable': false },
        { data: 'po', 'orderable': false },
        { data: 'qty', 'orderable': false },
        { data: 'prepStatId', 'orderable': false },
        { data: 'stiStatId', 'orderable': false }
      ],
      order: [0, 'asc'],
      autoWidth: false
    };
    //this.persons.forEach(x => {x.isPrep = false});
    //this.datsx = this.persons.map( item => {
    //item.isPrep = false
    //  return item;
    //});
    console.log("cfffffffffffffff")
    console.log(this.listPOs);
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    console.log(1)
  }

  rerender(): void {
    console.log("sc po: ", this.poo);
    console.log("sc model: ", this.modelo);
    console.log("sc line: ", this.lineo);
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

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    console.log("fsi");
    this.selectedItemsList = this.listPOs.filter((value, index) => {
      console.log(value);
      return value.IsStiCheck
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.listPOs.forEach((value, index) => {
      console.log(value.IsStiCheck);
      if (value.IsStiCheck) {
        this.checkedIDs.push(value.PO);
      }
    });
    console.log("fck");
    console.log(this.checkedIDs);
  }




}
