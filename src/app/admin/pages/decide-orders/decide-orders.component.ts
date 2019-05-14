import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-decide-orders',
  templateUrl: './decide-orders.component.html',
  styleUrls: ['./decide-orders.component.css']
})
export class DecideOrdersComponent implements OnInit {

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
  stat_item: any;


  displayedColumns = [ 'name_product' , 'name_shop' , 'receiver' , 'price' , 'actionsColumn'];// column จากservice json
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private userService: UserService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {

    this.get_products();
  }

  get_products() {

    this.adminService.get_decideProducts().subscribe(
      res => {
        console.log('admin_products=>', res['body']);
        this.dataSource = new MatTableDataSource(res['body']);
      }, err => {
        console.log('err=>', err);
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
     this.router.navigate(['admin/decideOrders/', next]);
  }

}
