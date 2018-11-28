import { Component, OnInit } from '@angular/core';
import { ShopcartService } from 'src/app/services/core/shopcart.service';

@Component({
  selector: 'app-shopping-carts',
  templateUrl: './shopping-carts.component.html',
  styleUrls: ['./shopping-carts.component.css'],
  providers: [ShopcartService]
})
export class ShoppingCartsComponent implements OnInit {

  constructor(private shopcartService: ShopcartService) { }

  ngOnInit() {
    this.shopcartService.getOrder().subscribe(
      res => {
        console.log('shopCart', res);
      },
      error => {
        console.log('err', error);
      }
    );

  }

}
