import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AddshipDialogComponent } from './addship-dialog/addship-dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shipping-manage',
  templateUrl: './shipping-manage.component.html',
  styleUrls: ['./shipping-manage.component.css']
})
export class ShippingManageComponent implements OnInit {

  count_ind: any;

  seller_products: any;

  reciever = [];
  quantity = [];
  product_delivery = [];
  price_all = [];
  name_products = [];

  order_item = [];
  loading: any;
  count_item: any;

  stat_name = [];

  create_ship: FormGroup;
  data_service: FormGroup;
  name_data = [];
  order_num = [];

  displayedColumns = [ 'id_type' , 'name_ship' , 'actionsColumn'];// column จากservice json
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

    this.get_shippings();
  }

  get_shippings() {
    this.adminService.get_shippings().subscribe(
      res => {
        console.log('res_shipping=>', res['body']);
        this.dataSource = new MatTableDataSource(res['body']);
        for (let i = 0; i < res['body'].length; i++) {
          this.stat_name[i] = true;
          this.name_data[i] = res['body'][i].name_ship;
          this.order_num[i] = i+1;
        }

      }, err => {
        console.log('ship_err=>', err);
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


  on_goManageProducts(id: any, id_order: any, id_item: any) {
    // alert(id);
    const next = id + '_' + id_item + '_' + id_order;

  }

  on_addShipping() {
    const dialogRef = this.dialog.open(AddshipDialogComponent, {
      width: '500px'
     });

     dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result.status === true && result.data !== '') {
        this.create_ship = this.fb.group({
          name_ship: result.data
        });

        console.log(this.create_ship.value);

        this.adminService.create_shipping(this.create_ship.value).subscribe(
          res => {

            console.log('create_ship=>', res);
            this.ngOnInit();
          }, err => {
            console.log('err_ship=>', err);
          }
        );
      }
    });
  }

  on_deleteShipping(id_type: any) {
    console.log('type', id_type);

    const c = confirm('คุณต้องการลบการจัดส่ง หรือไม่');

    if (c) {
      this.adminService.delete_shipping(id_type).subscribe(
        res => {
          console.log('delete_ship=>', res);
          this.ngOnInit();
        }, err => {
          console.log('delete_ship=>', err);
        }
      );

    }


  }

  on_editShipping(id_type: any, ind: any , txt: any) {
   // alert(ind);
    this.stat_name[ind] = false;


  }

  on_confirm(id_type: any ,ind: any , txt: HTMLInputElement) {
    this.stat_name[ind] = true;
  //  console.log(txt.value);

    this.data_service = this.fb.group({
      id_type: id_type,
      name_ship: txt.value
    });

    console.log('edit_data=>', this.data_service.value);

    this.adminService.update_shipping(this.data_service.value).subscribe(
      res => {
        alert('อัพเดท การจัดส่งสำเร็จ');
        console.log('update_ship=>', res);
      }, err => {
        console.log('update_ship=>', err);
      }
    );
  }

}
