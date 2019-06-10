import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/admin/user.service';
import { LoginService } from 'src/app/services/login.service';
import { BusinessService } from 'src/app/services/admin/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-mn',
  templateUrl: './business-mn.component.html',
  styleUrls: ['./business-mn.component.css']
})
export class BusinessMnComponent implements OnInit {

  @Output() infoPass = new EventEmitter();
  @Output() editProfile = new EventEmitter();

  //  COLUMN FROMJSON SERVICE
  displayedColumns = [ 'sequence' , 'name', 'detail', 'status'];
  dataSource: MatTableDataSource<any>;

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;


  constructor(
    private BusinessService: BusinessService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.BusinessService.getBusinessRule().subscribe(
      response => { console.log("MY RULE", response)
        this.dataSource = new MatTableDataSource(response['body']);
      }
      , error => { console.log("MY ERROR", error) }
    )
  }

  checkStatus(status: any) {
    if (status === 'USING') {
      return true;
    }
    else {
      return false;
    }
  }

  /*
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  */

  onChange(businessID, businessModel) {
    let confirmChanging = confirm("คุณแน่ใจหรือไม่ที่ต้องการเปลี่ยนกฎเกณฑ์ทางธุรกิจเป็น \nกฎ"+businessModel+" ?")
    if(confirmChanging) {
      this.BusinessService.setBusinessRule(businessID).subscribe(
        response => { //console.log(response)
          if (response['status'] === 200) {
            alert(response['msg'])
          }
          else
            alert("Error ! : "+response['msg'])
          this.ngOnInit();
        }
        , error => { console.log(error) }
      )
    }
    else {
      this.ngOnInit();
    }
  }

}
