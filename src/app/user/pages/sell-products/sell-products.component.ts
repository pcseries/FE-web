import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {

  seller_products = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }


}
