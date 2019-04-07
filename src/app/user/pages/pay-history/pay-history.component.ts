import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay-history',
  templateUrl: './pay-history.component.html',
  styleUrls: ['./pay-history.component.css']
})
export class PayHistoryComponent implements OnInit {

  is_ordered: any;
  is_canceled: any;
  is_delivery: any;
  id_selected: any;

  id_type: any;

  products_ordered = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id_type = this.route.snapshot.paramMap.get('id');
    // alert('id_type=>' + this.id_type);
    this.on_selectType(this.id_type);

  }


  on_selectType(type: any) {

    if (type === '0') {
      // alert(0);
      this.on_type0();

    } else if (type === '1') {

      this.on_type1();
    }
  }

  on_type0() {
    this.is_canceled = false;
    this.is_ordered = true;
    this.is_delivery = false;
  }

  on_type1() {
    this.is_canceled = false;
    this.is_ordered = false;
    this.is_delivery = true;
  }

  on_type2() {

  }

  on_type3() {

  }

  on_type4() {
    this.is_canceled = true;
    this.is_ordered = false;
    this.is_delivery = false;

  }

  on_type5() {

  }


  on_pageCanceled() {

   this.on_type4();
  }

  on_pageOrdered() {
    this.on_type0();
  }

  on_pageDelivery() {
    this.on_type1();
  }

}
