import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit , ViewChild} from '@angular/core';
import { ReportService } from '../../../core/_services/report.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCriteriaInquiryRepDT } from '../../../core/_models/dtModels/datatable';
import { Subject, Observable, Subscription } from 'rxjs';
import { ResponseDT } from '../../../core/_models/dtModels/datatable';


@Component({
  selector: 'app-inquiry-report',
  templateUrl: './inquiry-report.component.html',
  styleUrls: ['./inquiry-report.component.css']
})
export class InquiryReportComponent implements OnInit {

  searchFrom!: FormGroup
  submitted = false
  errfield = false
  isCollapsed: boolean = false;

  daterangepickerModel?: Date[] = null

  buildings: any
  cells: any
  listdata: ListReportData[]
  reportdata: any[] = []

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaInquiryRepDT = {
    isPageLoad: true,
    line: '',
    po: '',
    startDate: null,
    endDate: null,
    status: '',
    building: '',
    seq: '',
  }
  container: any = {}


  statusList: Array <{id: string, name: string}> = [
      {id: '', name: 'ALL'},
      {id: 'READY', name: 'READY'},
      {id: 'DISPATCH', name: 'DISPATCH'},
  ];

  constructor(private formBuilder: FormBuilder, private _reportSvc: ReportService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.searchFrom = this.formBuilder.group({
      x: ['', Validators.required],
      xx: ['', Validators.required],
      xxx: ['', Validators.required],
    })
    //this.spinner.show();
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
        this._reportSvc.getInquireReportList(dataTablesParameters)
          .subscribe(resp => {
            this.reportdata = resp.data;
            this.spinner.hide();

            console.log(resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'cellName', 'orderable': false },
        { data: 'plan_Start_STC', 'orderable': false },
        { data: 'po', 'orderable': false },
        { data: 'style_Name', 'orderable': false },
        { data: 'style_No', 'orderable': false },
        { data: 'article', 'orderable': false },
        { data: 'seq', 'orderable': false },
        { data: 'qty', 'orderable': false },
        { data: 'readyQty', 'orderable': false },
        { data: 'dispatchQty', 'orderable': false },
        { data: 'balanceyQty', 'orderable': false },
        { data: 'scanAt', 'orderable': false },
        { data: 'scanDeliveryAt', 'orderable': false }
      ],
      //order: [0, 'asc'],
      autoWidth: false
    };
    this.getSearchOption()

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    //console.log(1)
  }

  rerender(): void {
    this.searchCriteria.isPageLoad = false;
    // this.searchCriteria.filter = this.poo;
    // this.searchCriteria.filter2 = this.modelo;
    // this.searchCriteria.filter3 = this.lineo;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  search() {
    this.rerender();
  }

  getSearchOption() {
    this.searchCriteria.seq = 'N'
    this._reportSvc.getSearchOptionParam().subscribe(
      (res: any) => {
        console.log(res)
        this.buildings = res.buildings.map( item => {
          return {id: item, name: item}
        })
        this.cells = res.cells.map( item => {
          return {id: item.line_ID, name: item.line_ID + ' - ' + item.line_Name}
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  searchData() {
    this.submitted = true
    if(this.searchCriteria.po === '' && this.daterangepickerModel === null) {
      this.errfield = true
      return
    }
    this.errfield = false
    this.isCollapsed = true
    if(this.daterangepickerModel !== null) {
      this.searchCriteria.startDate = new Date(this.daterangepickerModel[0].setHours(0,0,0,0))
      this.searchCriteria.endDate = new Date(this.daterangepickerModel[1].setHours(23,59,59,999))
    }
    console.log(this.searchCriteria)
    this.search()
  }

  downloadData() {
    this.submitted = true
    if(this.searchCriteria.po === '' && this.daterangepickerModel === null) {
      this.errfield = true
      return
    }
    this.errfield = false
    if(this.daterangepickerModel !== null) {
      this.searchCriteria.startDate = new Date(this.daterangepickerModel[0].setHours(0,0,0,0))
      this.searchCriteria.endDate = new Date(this.daterangepickerModel[1].setHours(23,59,59,999))
    }
    this.container.searchCriteria = this.searchCriteria;
    this.spinner.show()
    this._reportSvc.inquireReportExportExcel(this.container)
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'DS_InquireReport_' + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        this.spinner.hide()
      });
  }

}


export interface ListReportData {
  factory: string
  building: string
  line: string
  cellName: string
  pO: string
  mO_Seq: string
  style_No: string
  style_Name: string
  article: string
  seq: string
  qty: number
  readyQty: number
  dispatchQty: number
  balanceQty: number
  plan_Start_STC: Date
  scanAt: Date
  scanDeliveryAt: Date


}
