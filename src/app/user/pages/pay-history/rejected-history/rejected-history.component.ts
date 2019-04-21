import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejected-history',
  templateUrl: './rejected-history.component.html',
  styleUrls: ['./rejected-history.component.css']
})
export class RejectedHistoryComponent implements OnInit {


  product_status: any;
  products_rejected = [];
  countpaid_ind = 0;
  order_item = [];

  count_ind2: any;
  imageToShow = [];

  tracking_num = [];

  price_all = [];

  status_track = [];

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
    this.get_rejectedorder();
  }

  get_rejectedorder() {
    this.productsService.get_order().subscribe(
      res => {

        for (let i = 0 ; i < res['body'].order.length; i++) {
          // console.log('get_order=>', res['body'].order[i]);

          if (res['body'].order[i].order_status === 'PAID') {
            this.products_rejected[this.countpaid_ind] = res['body'].order[i];

            for (let j = 0; j < this.products_rejected[this.countpaid_ind].order_item.length; j++) {

              this.product_status = this.products_rejected[this.countpaid_ind].order_item[j].order_item_status;

              if (this.product_status === 'REJECTED') {


                this.count = this.count + 1;

                this.order_item[this.count_ind2] = this.products_rejected[this.countpaid_ind].order_item[j];

                console.log('order_item=>', this.order_item[this.count_ind2]);

                if (this.order_item[this.count_ind2].tracking_number !== undefined) {
                  this.tracking_num[this.count_ind2] = this.order_item[this.count_ind2].tracking_number;
                }

                if (this.order_item[this.count_ind2].checkpoint !== undefined) {
                  this.status_track[this.count_ind2] = true;
                } else {
                  this.status_track[this.count_ind2] = false;
                }


                this.price_all[this.count_ind2] =  this.products_rejected[this.countpaid_ind].price_total;
                // id and picture_name
                let id = this.order_item[this.count_ind2].id_product;
                let picture = this.order_item[this.count_ind2].pic_product;

               // console.log('id=>', id);
               // console.log('pic_name=>', picture);

                this.getImageFromService(id, picture , this.count_ind2);
                this.count_ind2 = this.count_ind2 + 1;


              }
            }
            this.countpaid_ind = this.countpaid_ind + 1;
          } else if (res['body'].order[i].order_status  === 'PAID') {

            continue;
          }
        }
        if (this.count === 0) {
          this.not_loading = false;
        }
      }, err => {
        console.log('err_rejedted=>', err);
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
    const go = 5 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
     this.router.navigate(['user/payHistory/dtail/', go]);
  }

}
