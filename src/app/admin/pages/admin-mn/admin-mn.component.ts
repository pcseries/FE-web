import { Component, OnInit } from '@angular/core';
import { AddAdminComponent } from './add-admin/add-admin.component';

@Component({
  selector: 'app-admin-mn',
  templateUrl: './admin-mn.component.html',
  styleUrls: ['./admin-mn.component.css' ]
})
export class AdminMNComponent implements OnInit {


  isAddadmin: boolean ;
  isInfo: boolean;
  isSeeadmin: boolean;
  isEdit: boolean;
  storeInfo = [];
  storeName: any;

  constructor() { }

  ngOnInit() {
    this.isAddadmin = false;
    this.isSeeadmin = false;
    this.isEdit = false;
  }

  addAdmin() {
    this.isAddadmin = true;

  }
  backPage() {
    this.isAddadmin = false;
    this.isSeeadmin = false;
    this.isEdit = false;
  }

  set add(value) {
    this.isAddadmin = value;
  }

  onPassinfo(info) {
    this.isSeeadmin = info.stat;
    this.storeInfo = info;
  }

  onEditprofile(info) {
    this.isEdit = info.stat;
    this.storeName = info.uName;
  }

}


