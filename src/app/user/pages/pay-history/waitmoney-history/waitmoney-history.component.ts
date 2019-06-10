import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-waitmoney-history',
  templateUrl: './waitmoney-history.component.html',
  styleUrls: ['./waitmoney-history.component.css']
})
export class WaitmoneyHistoryComponent implements OnInit {

  products_ordered = [];
  order_item = [];
  order_priceAll = [];

  count_ind: any;
  count_ind2: any;

  imageToShow = [];


  loading: any;

  count: any;
  not_loading: any;
  product_delete = [];


  constructor(
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.count = 0;
    this.not_loading = true;
    this.loading = false;
    this.count_ind = 0;
    this.count_ind2 = 0;
    this.get_waitmoney();
  }

  get_waitmoney() {
    this.productsService.get_order().subscribe(
      res => {
       // console.log('get_ordered=>', res['body'].order);

        for (let i = 0; i < res['body'].order.length; i++) {

          if (res['body'].order[i].order_status === 'PAID' ) {
            this.products_ordered[this.count_ind2] = res['body'].order[i];
            // console.log('products_ordered=>', this.products_ordered[this.count_ind2]);

            for (let j = 0; j < this.products_ordered[this.count_ind2].order_item.length; j++) {

              if (this.products_ordered[this.count_ind2].order_item[j].order_item_status === 'CANCEL_BUYER') {

                this.count = this.count + 1;
                this.order_item[this.count_ind] = this.products_ordered[this.count_ind2].order_item[j];
                 console.log('order_item=>', this.order_item[j].id_item);

                this.order_priceAll[this.count_ind] = ((this.products_ordered[this.count_ind2].order_item[j].price
                  * this.products_ordered[this.count_ind2].order_item[j].quantity)
                  + this.products_ordered[this.count_ind2].order_item[j].product_delivery.price);

                // console.log('id=>', this.products_ordered[this.count_ind2].order_item[j].id_product);
                // console.log('pic=>', this.products_ordered[this.count_ind2].order_item[j].pic_product);
                this.getImageFromService(this.products_ordered[this.count_ind2].order_item[j].id_product,
                  this.products_ordered[this.count_ind2].order_item[j].pic_product, this.count_ind);

                this.count_ind = this.count_ind + 1;
              }


            }
            this.count_ind2 = this.count_ind2 + 1;
          }

          // if (i === (res['body'].order.length - 1)) {
          //   console.log('reverse');
          //   this.order_item.reverse();

          // }
        }
        if (this.count === 0) {

          this.not_loading = false;
        }
      }, err => {
        console.log('err_ordered=>', err);
      }
    );
  }

  getImageFromService(id: any, namePic: any, i: any) {
    this.productsService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data, i);
        this.product_delete[i] = false;
      },
      error => {

        console.log(error);
        this.product_delete[i] = true;
        this.loading = true;
        this.imageToShow[i] = 'https://www.lauriloewenberg.com/wp-content/uploads/2019/04/No_Image_Available.jpg';
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
    const go = 6 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
     this.router.navigate(['user/payHistory/dtail/', go]);
  }

  see_shop(id_shop) {
    // alert('ดูร้านค้า');
     this.router.navigate(['mado/seeShop/', id_shop]);
   }


}
