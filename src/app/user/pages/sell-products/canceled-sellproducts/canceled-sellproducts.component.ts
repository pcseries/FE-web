import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canceled-sellproducts',
  templateUrl: './canceled-sellproducts.component.html',
  styleUrls: ['./canceled-sellproducts.component.css']
})
export class CanceledSellproductsComponent implements OnInit {

  seller_products: any;
  reciever = [];
  quantity = [];
  product_delivery = [];
  price_all = [];
  name_products = [];

  order_item = [];
  count_ind: any;
  loading: any;
  count_item: any;
  stat_item: any;

  p1: number = 1;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.stat_item = true;
    this.count_item = 0;
    this.loading = true;
    this.count_ind = 0;
    this.get_products();
  }


  get_products() {
    this.userService.getseller_products().subscribe(
      res => {
        console.log('res_canceled=>', res['body'].order_item);

        this.seller_products = res['body'].order_item;

        for (let i = 0; i < this.seller_products.length; i++) {
          if (this.seller_products[i].status === 'CANCEL_BUYER') {

            this.count_item = this.count_item + 1;
            console.log('canceled_product=>', this.seller_products[i]);
            this.order_item[this.count_ind] = this.seller_products[i];

            this.reciever[this.count_ind] = this.order_item[this.count_ind].delivery_address.receiver;
            this.quantity[this.count_ind] = this.order_item[this.count_ind].quantity;
            this.product_delivery[this.count_ind] = this.order_item[this.count_ind].product_delivery.type;
            this.price_all[this.count_ind] = (this.order_item[this.count_ind].price * this.quantity[this.count_ind])
              + this.order_item[this.count_ind].product_delivery.price_ship;
            this.name_products[this.count_ind] = this.order_item[this.count_ind].product.name_product;

            this.count_ind ++;
          }

          if (i === (this.seller_products.length - 1)) {
            this.loading = false;
          }
        }

        if (this.count_item === 0) {
          // alert('success');
           this.stat_item = false;
         }
      }, err => {
        this.stat_item = false;
      }
    );

  }



  go_detail(ind: any) {
    // alert(this.seller_products[ind].id_item);
    const go_page = '4_'  + this.order_item[ind].id_item+ '_' + this.order_item[ind].id_order;
   this.router.navigate(['user/sellProducts/manage-ordered/', go_page]);
  }

}
