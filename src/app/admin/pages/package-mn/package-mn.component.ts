import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AddpackageDialogComponent } from './addpackage-dialog/addpackage-dialog.component';

@Component({
  selector: 'app-package-mn',
  templateUrl: './package-mn.component.html',
  styleUrls: ['./package-mn.component.css']
})
export class PackageMnComponent implements OnInit {

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

  create_pac: any;
  data_service: FormGroup;
  name_data = [];
  order_num = [];
  status_pac = [];

  status_edit: any;

  data_package: any;
  id_edit: any;
  edit_form: FormGroup;

  displayedColumns = [ 'id_package' , 'package_name', 'price' , 'day' , 'status' , 'actionsColumn'];// column จากservice json
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
    this.status_edit = false;
    this.get_package();
  }

  get_package() {
    this.adminService.get_package().subscribe(
      res => {
        console.log('res_shipping=>', res['body']);
        this.dataSource = new MatTableDataSource(res['body']);
        this.data_package = res['body'];
        for (let i = 0; i < res['body'].length; i++) {
          this.stat_name[i] = true;
          this.name_data[i] = res['body'][i].package_name;
          this.order_num[i] = i+1;

          if (res['body'][i].status === 'Enable') {
            this.status_pac[i] = true;
          } else {
            this.status_pac[i] = false;
          }
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

  on_addpackage() {
    const dialogRef = this.dialog.open(AddpackageDialogComponent, {
      width: '500px'
     });

     dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result.status === true && result.data !== '') {
        this.create_pac = this.fb.group({
          name: result.name,
          price: parseInt(result.price , 10) ,
          day: result.day
        });

        console.log(this.create_pac.value);

        this.adminService.add_package(this.create_pac.value).subscribe(
          res => {
            console.log('createPackage_ok', res);
            this.ngOnInit();
          }, err => {
            console.log('createPackage_err', err);
          }
        );
      }
    });
  }

  on_deletePackage(id_type: any) {
    console.log('type', id_type);

    const c = confirm('คุณต้องการลบแพคเก็จ หรือไม่');

    if (c) {
      this.adminService.delete_package(id_type).subscribe(
        res => {
          console.log('delete_ship=>', res);
          this.ngOnInit();
        }, err => {
          console.log('delete_ship=>', err);
        }
      );

    }


  }

  // on_editPackage(ind: any) {
  //   // alert(ind);
  //   this.status_edit = true;


  // }

  edit_status(ind: any) {
    console.log('staus', this.status_pac[ind]);
    console.log('data', this.data_package[ind]);
    if (this.status_pac[ind] === false) {
      // active enable
      this.edit_form = this.fb.group({
        id: this.data_package[ind].id_package,
        status: 'Enable'
      });
    } else {
      // disable
      this.edit_form = this.fb.group({
        id: this.data_package[ind].id_package,
        status: 'Disable'
      });
    }

    this.adminService.edit_statusPackage(this.edit_form.value).subscribe(
      res => {
        console.log('edit_statusOK', res);
        this.ngOnInit();
      }, err => {
        console.log('edit_statusERR', err);
      }
    );
  }

  on_confirm(id_type: any ,ind: any , txt: HTMLInputElement) {
    this.stat_name[ind] = true;
  //  console.log(txt.value);

    this.data_service = this.fb.group({
      id_type: id_type,
      name_ship: txt.value
    });

    console.log('edit_data=>', this.data_service.value);

    // this.adminService.update_shipping(this.data_service.value).subscribe(
    //   res => {
    //     alert('อัพเดท การจัดส่งสำเร็จ');
    //     console.log('update_ship=>', res);
    //   }, err => {
    //     console.log('update_ship=>', err);
    //   }
    // );
  }



}
