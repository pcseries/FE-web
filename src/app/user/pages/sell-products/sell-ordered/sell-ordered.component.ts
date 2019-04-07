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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.get_products();
  }

  get_products() {
    this.userService.getseller_products().subscribe(
      res => {
        this.seller_products = res['body']['order_item'];
        for (let i = 0; i < this.seller_products.length; i++) {
          console.log('seller product=>', this.seller_products[i]);
          this.reciever[i] = this.seller_products[i].delivery_address.receiver;
          this.quantity[i] = this.seller_products[i].quantity;
          this.product_delivery[i] = this.seller_products[i].product_delivery.type;
          this.price_all[i] = (this.seller_products[i].price * this.quantity[i])
          + this.seller_products[i].product_delivery.price_ship;
          this.name_products[i] = this.seller_products[i].product.name_product;

        }
      }, err => {
        console.log('error seller=>', err);
      }
    );
  }

  go_detail(ind: any) {
    alert(this.seller_products[ind].id_item);
    // this.router.navigate(['user/sellProducts/manage-ordered/', ])
  }

}
