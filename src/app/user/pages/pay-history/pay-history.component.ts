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
  is_precomplete: any;
  is_complete: any;
  is_rejected: any;
  is_waitignmoney: any;

  id_selected: any;



  id_type: any;

  products_ordered = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.on_falsepages();
    this.id_type = this.route.snapshot.paramMap.get('id');
    // alert('id_type=>' + this.id_type);
    this.on_selectType(this.id_type);

  }

  on_falsepages() {
    this.is_canceled = false;
    this.is_ordered = false;
    this.is_delivery = false;
    this.is_precomplete = false;
    this.is_complete = false;
    this.is_rejected = false;
    this.is_waitignmoney = false;
  }

  on_selectType(type: any) {

    if (type === '0') {
      // alert(0);
      this.on_type0();

    } else if (type === '1') {

      this.on_type1();
    } else if (type === '2') {
      this.on_type2();
    } else if (type === '3') {
      this.on_pagecomplete();
    } else if (type === '4') {
      this.on_pageCanceled();
    } else if (type === '5') {
      this.on_pagerejected();
      if (this.is_rejected === false) {
       //  alert('dd');
        this.ngOnInit();
      }
    } else if (type === '6') {
      this.on_pagewaiting();
    }
    else {
      this.on_type0();
    }
  }

  on_type0() {
    this.on_falsepages();
    this.is_ordered = true;

  }

  on_type1() {
    this.on_falsepages();
    this.is_delivery = true;

  }

  on_type2() {

    this.on_falsepages();
    this.is_precomplete = true;
  }

  on_type3() {

    this.on_falsepages();
    this.is_rejected = true;
  }

  on_type4() {

    this.on_falsepages();
this.is_canceled = true;
  }

  on_type5() {
    this.on_falsepages();
    this.is_complete = true;
  }

  on_type6() {
    this.on_falsepages();
    this.is_waitignmoney = true;
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

  on_pageprecomplete() {
    this.on_type2();
  }

  on_pagecomplete() {
   // alert('complete page');
    this.on_type5();
  }

  on_pagerejected() {
    this.on_type3();
  }

  on_pagewaiting() {
    this.on_type6();
  }
}
