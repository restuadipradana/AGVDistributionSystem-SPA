import { GenerateQrService } from './../../../core/_services/generate-qr.service';
import { ListPO } from './../../../core/_models/list-po';
import { SearchCriteriaDT } from '../../../core/_models/dtModels/datatable';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from "ngx-spinner";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-generate-qr-v2',
  templateUrl: './generate-qr-v2.component.html',
  styleUrls: ['./generate-qr-v2.component.css']
})
export class GenerateQrV2Component implements OnInit {

  listPOs: ListPO[];
  listPOx: ListPO[];
  listPO: any = {};
  poo: string;
  modelo: string;
  lineo: string;
  packdata: any = {};
  pdfPartData: PartInfo[] = []
  pdfSizeData: SizeInfo[] = []

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
              private spinner: NgxSpinnerService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.pdfPartData = []
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
        this.generateQrSvc.search_v2(dataTablesParameters)
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
        { data: 'prepStat', 'orderable': false },
        //{ data: 'stiStatId', 'orderable': false }
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

  getPrintData(cyno: string) {
    console.log(cyno)
    this.generateQrSvc.gen_v2(cyno).subscribe(
      (res: any) => {
        console.log(res)
        this.printQr(res)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  printQr(res: any) {

    this.pdfPartData = []
    this.pdfPartData = res.part
    this.pdfSizeData = []
    this.pdfSizeData = res.size_info
    console.log(this.pdfPartData)
    let datenow =  this.datepipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a')

    let docDefinition = {
      info: {
        title: res.po_info.po.trim(),
        author: 'Restu TSH-IT',
        subject: 'Dispatch System',
        keywords: 'nokeyword',
      },
      header:
      function(currentPage, pageCount, pageSize) {
        let paging = ''
        //if(pageCount > 1) {
          paging = '  Page: ' + currentPage.toString() + '/' + pageCount
        //}
        return [
          {
            margin: [15, 10, 15, 1],
            columns: [
              { text: res.po_info.cellName, fontSize: 20, width: '7%', bold: true},
              {
                text: res.po_info.po.trim() + ' ' + res.po_info.style_Name.trim() + ' ' + res.po_info.style_No.trim() + ' ' + res.po_info.article.trim() + '\nDate: ' + datenow +
                paging,
                fontSize: 20,
                alignment: 'center',
                bold: true, width: '85%'},
              { qr: res.po_info.po.trim() , fit: '65', width: '8%'},
            ],
          },

        ]
      },
      content: [
        {
          table: {
            headerRows: 1,
            widths: ['7.5%', '6%', '*', ...this.pdfSizeData.map(e => ('3.3%')), '4%', 'auto', 'auto'],
            body: [
              [
                {style: 'tbHeader', text: 'Mat\'l No'} ,
                {style: 'tbHeader', text: 'Part'} ,
                {style: 'tbHeader', text: 'Component'},
                ...this.pdfSizeData.map(e => ({style: 'tbHeader', text: e.size_Code.trim()})),
                {style: 'tbHeader', text: 'Total'},
                {style: 'tbHeader', text: 'Bal. Qty'},
                {style: 'tbHeader', text: 'Status'},
              ],
              ...this.pdfPartData.map(e => ([
                {style: 'tbContent', text: e.material_ID} ,
                {style: 'tbContent', text: e.part} ,
                {style: 'tbContent', text: e.part_Name},
                ...this.pdfSizeData.map(e => ({style: 'tbContent', text: e.plan_Qty})),
                {style: 'tbContent', text: res.po_info.qty},
                {style: 'tbContent', text: ''},
                {style: 'tbContent', text: ''},
              ])),
            ]
          }
        },
        {
          text: ' ',
          fontSize: 7,
        },
        //{ qr: res.po_info.po.trim() , fit: '80'},
      ],
      styles: {
        tbHeader: {
          fontSize: 11,
          alignment: 'center',
          fillColor: '#bcbcbc',
        },
        tbContent: {
          fontSize: 9,
          //margin: [0, 15,0, 15]
        }
      },
      pageOrientation: 'landscape',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [15, 75, 15, 5] //top63
    }
    pdfMake.createPdf(docDefinition).print();
  }

  //**********************UNUSED AGAIN*************************** */

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

export interface PartInfo {
  pO_Category: string
  model_No: string
  color_No: string
  article: string
  part: string
  part_Name: string
  material_ID: string
  puF_Kind: string
  released_Status: string
  released_By: string
  released_Time: Date
}

export interface SizeInfo {
  factory_ID: string
  cycle_No: string
  size_Code: string
  size_TCode: string
  plan_Qty: number
  utN_Yield_Qty: number
  mO_No: string
  mO_Seq: string
}
