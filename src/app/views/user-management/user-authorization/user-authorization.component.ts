import { RoleByUser } from './../../../core/_models/role-by-user';
import { UserRole } from './../../../core/_models/user-role';
import { Roles } from './../../../core/_models/roles';
import { UserLogged } from './../../../core/_models/user-logged';
import { UserService } from './../../../core/_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css']
})
export class UserAuthorizationComponent implements OnInit {

  reuslt: any = {};
  listsUser: UserLogged[];
  roles: Roles[];
  userDetail: UserLogged = { account: '', role: [], name: '' };
  listRoleByUser: RoleByUser[] = [];
  userAuthorizationAccount: string = '';
  userAuthorizationName: string = '';
  acc: string;
  btnSave: boolean;
  userworkstation: any = {}
  deptList: any
  selectedDept: string = ''
  workstationList: any
  selectedWorkstation: string = ''



  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('workstationModal') public workstationModal: ModalDirective;

  constructor(private _userSvc: UserService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //console.log("ud", this.userDetail)
    this.getListUser();
  }

  getListUser(){
    this.spinner.show();
    this._userSvc.getAllUser().subscribe(
      (res: any) => {
        this.reuslt = res;
        this.listsUser = this.reuslt.lists;
        this.roles = this.reuslt.roles;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  getUserDetail(account: string, name: string){
    this.userAuthorizationAccount = account;
    this.userAuthorizationName = name;
    this._userSvc.getRoleByUser(this.userAuthorizationAccount).subscribe(
      res => {
        this.listRoleByUser = res;
        this.editModal.show();
      }
    );
  }

  saveAuthorizationUser() {
    const updateRoleByUser = this.listRoleByUser.filter(item => {
      return item.status === true;
    });
    this._userSvc.updateRoleByUser(this.userAuthorizationAccount, updateRoleByUser)
    .subscribe(() => {
      this.editModal.hide();
      this.createModal.hide();
      this.getListUser();
    }, error => {
    });
  }

  openModalAdd(){
    this._userSvc.getRoleByUser("x").subscribe(
      res => {
        this.listRoleByUser = res;
        this.userAuthorizationAccount = "";
        this.createModal.show();
      }
    );
  }

  checkUser(){
    this._userSvc.checkUser(this.userAuthorizationAccount).subscribe(
      (res: boolean) => {
        this.btnSave = res;
      },
      (error) => {
        console.log("Error: " , error.error.text);
      }
    );
  }

  getUserWorkstation(account: string) {
    this._userSvc.getUserWorkstation(account).subscribe(
      res => {
        //console.log(res)
        this.userworkstation = res;
        this.userworkstation.account = account
        this.selectedDept = this.userworkstation.dept_Id
        this.selectedWorkstation = this.userworkstation.workstation_Code
        this.deptList = this.userworkstation.deptList.map(item => {
          return { id: item.dept_ID, name: item.dept_ID + ' - ' + item.dept_Name }
        })
        this.workstationList = this.userworkstation.workstationList.map(item => {
          return {id: item, name: item }
        })
        this.workstationModal.show();
      }
    );
  }

  saveUserWorkstation() {
    console.log(this.selectedDept, this.selectedWorkstation, this.userworkstation.account)
    if(this.userworkstation.account === undefined || this.userworkstation.account === '' || this.selectedDept === '')  {
      return
    }
    this._userSvc.saveUserWorkstation(this.userworkstation.account, this.selectedWorkstation, this.selectedDept).subscribe(
      () => {
        this.workstationModal.hide()
        console.log("Save workstation success")
      },
      (error) => {
        console.log("Error guys", error)
      }
    )
  }



}
