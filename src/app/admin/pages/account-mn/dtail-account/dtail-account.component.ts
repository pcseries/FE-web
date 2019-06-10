import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/admin/user.service';
import { BusinessService } from 'src/app/services/admin/business.service';
import { StoreService } from 'src/app/services/core/store.service';

@Component({
  selector: 'app-dtail-account',
  templateUrl: './dtail-account.component.html',
  styleUrls: ['./dtail-account.component.css'],
  providers:[DatePipe]
})
export class DtailAccountComponent implements OnInit {

   //  COLUMN FROM JSON SERVICE
   displayedColumns = [ 'sequence', 'username', 'shop', 'moneyToBeTransferred', 'incomeReport', 'status', 'action'];

   transferDetail = [];
   userID = [];
   user: any = [];
   shop: any = [];
   allUsers: any;
   allShops: any;
   userEdit: FormGroup;
   length: any;

   data: any;
   paymentData: FormGroup;

   //  MANUAL CSS
   isTransfer = [];

   @Output() infoPass = new EventEmitter();
   @Output() editProfile = new EventEmitter();

   dataSource: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   //@ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private BusinessService: BusinessService,
    private StoreService: StoreService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {

    let incomeID = parseInt(localStorage.getItem('incomeID'), 10);
    this.BusinessService.getIncomeByID(incomeID).subscribe(
      response => { console.log("MY INCOME ID", response['body'][0]);
        this.dataSource = new MatTableDataSource(response['body'][0]['tranfer']);
        for(let i=0 ; i<response['body'][0]['tranfer'].length ; i++) {
          this.transferDetail.push(response['body'][0]['tranfer'][i]);
          if( this.transferDetail[i].status === "TRANSFER") {
            this.isTransfer[i] = true;
          }
          else
          this.isTransfer[i] = false;
          this.userID.push(this.transferDetail[i].id_user);
        }
        //  GET SHOP AFTER GET USER ID
        this.StoreService.getShop().subscribe(
          response => { this.allShops = response['body'];
            for(let i=0 ; i<this.allShops.length ; i++) {
              for(let j=0 ; j<this.userID.length ; j++) {
                if (this.userID[j] === this.allShops[i].id_user) {
                  //console.log("I'm here with j in shop.", this.userID[j])
                  //console.log("I'm here with all in shop.", this.userID)
                  this.shop.push(this.allShops[i].name_shop);
                  //break;
                }
              }
            }
            /*
            for(let i=0 ; i<this.shop.length ; i++ ) {
              console.log("i", this.shop[i]);
            }
            */
          }
          , error => { console.log(error); }
        );
        //  GET USERNAME AFTER GET USER ID
        this.userService.getUser().subscribe(
          response =>{ this.allUsers = response['body'];
            for(let i=0 ; i<this.allUsers.length ; i++) {
              for(let j=0 ; j<this.userID.length ; j++) {
                if (this.userID[j] === this.allUsers[i].id_user) {
                  //console.log("I'm here with j.", this.userID[j])
                  this.user.push(this.allUsers[i].name+" "+this.allUsers[i].sername);
                  //break;
                }
              }
            }
          }
          , error =>{ console.log(error); }
        );
        console.log("GET SHOP", this.shop);
      }
      , error => { console.log(error); }
    )
    console.log("TEST MY USER ID", this.userID);
    console.log("TEST MY SHOP", this.shop);

    /*
    setTimeout(() => {
      for(let i=0 ; i<this.shop.length ; i++) {
        console.log("test", this.shop[i])
      }
    }, 800);
    */

  }

  /*
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  */

  onDownload(transferID, path) {
    let incomeID = parseInt(localStorage.getItem('incomeID'), 10);
    this.BusinessService.getShopIncomeReportByID(incomeID, transferID).subscribe(
      response => { console.log(response) ;
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
      , error => { console.log(error); }
    )

  }

  onPayment(transferID, index) {

    let currentDate = new Date();
    let transferDatetime = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss'); // Use your own locale

    this.paymentData = this.formBuilder.group({
      transfer_datetime: transferDatetime,
    })

    let confirmPayment = confirm("คุณแน่ใจหรือไม่ที่ต้องการจะยืนยันการโอนเงินของผู้ใช้งาน \nคุณ "+this.user[index]+" จากร้าน "+this.shop[index])
    if (confirmPayment) {
      this.BusinessService.setTransfer(transferID, this.paymentData.value).subscribe(
        response => { console.log(response['status']) ;
          if(response['status'] === 200) {
            alert("Confirm payment successful !");
            this.ngOnInit();
          }
          else
            alert("Error ! : "+response['msg'])
        }
        , error => { alert(error['msg']); }
      )
    }

  }

  onPreviousPage() {
    this.router.navigate(['admin/business/accountManages']);
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

}
