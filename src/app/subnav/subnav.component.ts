import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/core/store.service';
import { ShopcartService } from '../services/core/shopcart.service';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css'],
  providers: [StoreService]
})
export class SubnavComponent implements OnInit {

  isOpen: any = false;
  status: any;
  shopCart = [];
  show_shop:boolean = false;

  amont: any;
  constructor(private storeService: StoreService,
    private shopcartService: ShopcartService) { }

  ngOnInit() {

    this.storeService.storeCheck().subscribe(
      res => {
        this.status = res['status'];
        if (this.status === 401) {
          //console.log('statusStore', this.status);
        } else {
          this.isOpen = true;
        }
      },
      err => {
        console.log('errStatus', err);
      }
    );

      this.getShopcart();
  }

  checkStore() {

  }

  onSubmit() {
    alert('SUCCESS!! ');
  }

  getShopcart() {
    if (localStorage.getItem('token') !== null) {
       this.shopcartService.getOrder().subscribe(
      res => {
        this.shopCart = res['body']['order'];
        this.amont = 0;
        //console.log('lengthSubnav' , this.shopCart.length);
        for (let i = 0 ; i < this.shopCart.length; i++) {
          if (this.shopCart[i].order_status === 'ORDERING') {
            this.show_shop = true;
            this.amont = this.shopCart[i]['order_item'].length;
          }

        }
        if (this.amont === 0) {
          this.show_shop = false;
        }
      }
    );
    }

  }

}
