import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-history',
  templateUrl: './complete-history.component.html',
  styleUrls: ['./complete-history.component.css']
})
export class CompleteHistoryComponent implements OnInit {

  product_status: any;
  products_complete = [];
  countpaid_ind = 0;
  count_ind2: any;

  order_item = [];

  imageToShow = [];
  tracking_num = [];
  price_all = [];

  loading: any;
  not_loading: any;
  count: any;

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.count = 0;
    this.not_loading = true;
    this.loading = false;
    this.count_ind2 = 0;
    this.countpaid_ind = 0;
    this.get_complete();
  }


  get_complete() {
    this.productsService.get_order().subscribe(
      res => {
        console.log('get_complete=>', res['body'].order);

        for (let i = 0 ; i < res['body'].order.length; i++) {
          if (res['body'].order[i].order_status === 'PAID') {


            this.products_complete[this.countpaid_ind] = res['body'].order[i];

            for (let j = 0; j < this.products_complete[this.countpaid_ind].order_item.length; j++) {
              this.product_status = this.products_complete[this.countpaid_ind].order_item[j].order_item_status;

              if (this.product_status === 'COMPLETED') {
                  this.count = this.count + 1;
                console.log('complete_products=>', this.products_complete[this.countpaid_ind]);
                this.order_item[this.count_ind2] = this.products_complete[this.countpaid_ind].order_item[j];

                if (this.order_item[this.count_ind2].tracking_number !== undefined) {
                  this.tracking_num[this.count_ind2] = this.order_item[this.count_ind2].tracking_number;
                }


                this.price_all[this.count_ind2] = this.products_complete[this.countpaid_ind].price_total;

                let id = this.order_item[this.count_ind2].id_product;
                let picture = this.order_item[this.count_ind2].pic_product;

                this.getImageFromService(id, picture , this.count_ind2);

                this.count_ind2 = this.count_ind2 + 1;
              }
            }
            this.countpaid_ind = this.countpaid_ind + 1;

          }
        }
        if (this.count === 0) {
          this.not_loading = false;
        }
      }, err => {
        console.log('error', err);
      }
    );
  }

  getImageFromService(id: any, namePic: any, i: any) {
    this.productsService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data, i);

      },
      error => {

        console.log(error);
      }
    );
  }


  createImageFromBlob(image: Blob, i: any) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow[i] = reader.result;
        this.loading = true;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  go_dtail_payhistory(ind: any) {
    // alert('go detail');
    console.log('item', this.order_item[ind]);
    const go = 3 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
     this.router.navigate(['user/payHistory/dtail/', go]);
  }


}
