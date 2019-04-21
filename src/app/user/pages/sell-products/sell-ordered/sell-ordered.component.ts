import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-ordered',
  templateUrl: './sell-ordered.component.html',
  styleUrls: ['./sell-ordered.component.css']
})
export class SellOrderedComponent implements OnInit {

  seller_products: any;
  reciever = [];
  quantity = [];
  product_delivery = [];
  price_all = [];
  name_products = [];

  order_item = [];
  count_ind: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.count_ind = 0;
    this.get_products();
  }

  get_products() {
    this.userService.getseller_products().subscribe(
      res => {
        this.seller_products = res['body']['order_item'];
        for (let i = 0; i < this.seller_products.length; i++) {


          console.log('seller product=>', this.seller_products[i]);

          if (this.seller_products[i].status === 'UNPAID') {
            this.order_item[this.count_ind] = this.seller_products[i];
            this.reciever[this.count_ind] = this.order_item[this.count_ind].delivery_address.receiver;
            this.quantity[this.count_ind] = this.order_item[this.count_ind].quantity;
            this.product_delivery[this.count_ind] = this.order_item[this.count_ind].product_delivery.type;
            this.price_all[this.count_ind] = (this.order_item[this.count_ind].price * this.quantity[this.count_ind])
              + this.order_item[this.count_ind].product_delivery.price_ship;
            this.name_products[this.count_ind] = this.order_item[this.count_ind].product.name_product;

            this.count_ind ++;
          }


        }
      }, err => {
        console.log('error seller=>', err);
      }
    );
  }

  go_detail(ind: any) {
    // alert(this.seller_products[ind].id_item);
    const go_page = '0_'  + this.order_item[ind].id_item;
   this.router.navigate(['user/sellProducts/manage-ordered/', go_page]);
  }

}
