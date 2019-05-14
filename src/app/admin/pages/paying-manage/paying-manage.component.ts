import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/admin/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddpayDialogComponent } from './addpay-dialog/addpay-dialog.component';

@Component({
  selector: 'app-paying-manage',
  templateUrl: './paying-manage.component.html',
  styleUrls: ['./paying-manage.component.css']
})
export class PayingManageComponent implements OnInit {


  name_data = [];
  stat_name = [];
  order_num = [];

  create_pay: FormGroup;
  data_service: FormGroup;

  displayedColumns = [ 'id_type_payment' , 'name_type' , 'actionsColumn'];// column จากservice json
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private userService: UserService,
    private router: Router,
    private adminService: AdminService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.get_paying();
  }


  get_paying() {
    this.adminService.get_paying().subscribe(
      res => {
        console.log('res_paying=>', res['body']);
        this.dataSource = new MatTableDataSource(res['body']);
        for (let i = 0; i < res['body'].length; i++) {
          this.stat_name[i] = true;
          this.order_num[i] = i+1;
        }
      }, err => {
        console.log('res_paying=>', err);
      }
    );
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  on_addPaying() {
    const dialogRef = this.dialog.open(AddpayDialogComponent, {
      width: '500px'
     });


     dialogRef.afterClosed().subscribe(result => {
      if (result.status === true && result.data !== '') {
        this.create_pay = this.fb.group({
          name_type: result.data
        });

        console.log(this.create_pay.value);

        this.adminService.add_paying(this.create_pay.value).subscribe(
          res => {
            console.log('create_pay=>', res);
            this.ngOnInit();
          }, err => {
            console.log('create_pay=>', err);
          }
        );
      }
    });
  }

  on_editPaying(ind: any ) {
    // alert(ind);
     this.stat_name[ind] = false;


   }

   on_deletePaying(id_type: any) {

    const c = confirm('คุณต้องการลบชนิดการจ่ายเงิน หรือไม่');

    if (c) {
      this.adminService.delete_paying(id_type).subscribe(
        res => {
          console.log('delete_pay', res);
          this.ngOnInit();
        }, err => {
        console.log('delete_pay', err);
        }
      );
    }

   }

   on_confirm(id_type: any ,ind: any , txt: HTMLInputElement) {

    this.data_service = this.fb.group({
      id_type_payment: id_type,
      name_type: txt.value
    });

    this.adminService.update_paying(this.data_service.value).subscribe(
      res => {
        console.log('update_paying=>', res);
        alert('อัพเดท ชนิดการชำระเงินสำเร็จ');
        this.stat_name[ind] = true;
      }, err =>{
        console.log('update_paying=>', err);
      }
    );

   }
}
