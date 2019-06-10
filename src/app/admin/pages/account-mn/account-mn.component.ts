import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/admin/business.service';



@Component({
  selector: 'app-account-mn',
  templateUrl: './account-mn.component.html',
  styleUrls: ['./account-mn.component.css']
})
export class AccountMnComponent implements OnInit {



  userEdit: FormGroup;
  length: any;

  @Output() infoPass = new EventEmitter();
  @Output() editProfile = new EventEmitter();

  //  COLUMN FROM JSON SERVICE
  displayedColumns = [ 'sequence','round', 'income', 'status', 'incomeReport', 'detail'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(
    private BusinessService: BusinessService,
    private router: Router,

  ) { }



  ngOnInit() {
    console.log("TOKEN", localStorage.getItem('token'))

    this.BusinessService.getIncome().subscribe(
      response => { console.log("MY INCOME", response)
        this.dataSource = new MatTableDataSource(response['body']);
      }
      , error => { console.log("MY ERROR", error) }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  onDetail(id) {
    localStorage.setItem('incomeID', id);
    this.router.navigate(['admin/business/accountDtail']);
  }

  onDownload(incomeID, path) {
    this.BusinessService.getIncomeReportByID(incomeID).subscribe(
      response => { console.log(response);
          /*
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          var newBlob = new Blob([response], { type: "application/pdf" });

          // IE doesn't allow using a blob object directly as link href
          // instead it is necessary to use msSaveOrOpenBlob
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
          }

          // For other browsers:
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);

          var link = document.createElement('a');
          link.href = data;
          link.download = "Je kar.pdf";
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

          setTimeout(function () {
              // For Firefox it is necessary to delay revoking the ObjectURL
              window.URL.revokeObjectURL(data);
              link.remove();
          }, 100);
          */

          var blob = new Blob([response], {type: 'application/pdf'});

          var downloadURL = window.URL.createObjectURL(response);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = path;
          link.click();

      }
      , error => { console.log(error) }
    );
  }



}
