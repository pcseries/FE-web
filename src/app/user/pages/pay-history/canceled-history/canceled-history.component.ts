import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-canceled-history',
  templateUrl: './canceled-history.component.html',
  styleUrls: ['./canceled-history.component.css']
})
export class CanceledHistoryComponent implements OnInit {

  products_ordered = [];
  order_item = [];
  order_priceAll = [];

  count_ind: any;
  count_ind2: any;

  imageToShow = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.count_ind = 0;
    this.count_ind2 = 0;
    this.get_canceledOrder();
  }

  get_canceledOrder() {
    this.productsService.get_order().subscribe(
      res => {
        console.log('get_ordered=>', res['body'].order);

        for (let i = 0; i < res['body'].order.length; i++) {

          if (res['body'].order[i].order_status === 'ORDERED') {
            this.products_ordered[this.count_ind2] = (res['body'].order[i]);
            console.log('products_ordered=>', this.products_ordered[i]);

            for (let j = 0; j < this.products_ordered[i].order_item.length; j++) {

              if (this.products_ordered[i].order_item[j].order_item_status === 'CANCEL_BUYER') {
                this.order_item[this.count_ind] = this.products_ordered[this.count_ind2].order_item[j];
                console.log('order_item=>', this.order_item[j]);

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
        }
      }, error => {
        console.log('err_ordered=>', error);
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
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }



}
