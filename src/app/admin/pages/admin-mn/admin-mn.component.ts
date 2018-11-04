import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-mn',
  templateUrl: './admin-mn.component.html',
  styleUrls: ['./admin-mn.component.css', './../admin-page.component.scss' ]
})
export class AdminMNComponent implements OnInit {


  isAddadmin: boolean ;

  constructor() { }

  ngOnInit() {
    this.isAddadmin = false;
  }

  addAdmin() {
    this.isAddadmin = true;

  }
  backPage() {
    this.isAddadmin = false;
  }


}


