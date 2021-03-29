import { RoleByUser } from './../../../core/_models/role-by-user';
import { UserRole } from './../../../core/_models/user-role';
import { Roles } from './../../../core/_models/roles';
import { UserLogged } from './../../../core/_models/user-logged';
import { UserService } from './../../../core/_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

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



  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private _userSvc: UserService) { }

  ngOnInit(): void {
    console.log("ud", this.userDetail)
    this.getListUser();
  }

  getListUser(){
    this._userSvc.getAllUser().subscribe(
      (res: any) => {
        this.reuslt = res;
        this.listsUser = this.reuslt.lists;
        this.roles = this.reuslt.roles;
      },
      (error) => {
        console.log(error);
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



}
