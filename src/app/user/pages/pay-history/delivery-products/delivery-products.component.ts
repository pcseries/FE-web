import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-products',
  templateUrl: './delivery-products.component.html',
  styleUrls: ['./delivery-products.component.css']
})
export class DeliveryProductsComponent implements OnInit {


  countpaid_ind = 0;
  count_ind2: any;
  count_ind: any;

  order_item = [];
  products_paid = [];

  tracking_num = [];
  imageToShow = [];
  price_all = [];


  status_track = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }


  ngOnInit() {

    this.count_ind2 = 0;
    this.countpaid_ind = 0;
    this.get_paidOrder();
  }

  get_paidOrder() {
    this.productsService.get_order().subscribe(
      res => {

        console.log('get_paid=>', res['body'].order);
        for (let i = 0 ; i < res['body'].order.length; i++) {

          console.log('get_paid=>', res['body'].order[i]);

          if (res['body'].order[i].order_status === 'PAID') {
            this.products_paid[this.countpaid_ind] = res['body'].order[i];


            for (let j = 0; j < this.products_paid[this.countpaid_ind].order_item.length; j++) {

              console.log('products_paid=>', this.products_paid[this.countpaid_ind].order_item[j]);

              this.order_item[this.count_ind2] = this.products_paid[this.countpaid_ind].order_item[j];

              if (this.order_item[this.count_ind2].tracking_number !== undefined) {
                this.tracking_num[this.count_ind2] = this.order_item[this.count_ind2].tracking_number;
              }

              if (this.order_item[this.count_ind2].checkpoint !== undefined) {
                this.status_track[this.count_ind2] = true;
              } else {
                this.status_track[this.count_ind2] = false;
              }


              this.price_all[this.count_ind2] = (this.order_item[this.countpaid_ind].price *
                  this.order_item[this.countpaid_ind].quantity ) +
                  this.order_item[this.countpaid_ind].product_delivery.price;
              // id and picture_name
              let id = this.order_item[this.countpaid_ind].id_product;
              let picture = this.order_item[this.countpaid_ind].pic_product;

              console.log('id=>', id);
              console.log('pic_name=>', picture);

              this.getImageFromService(id, picture , this.count_ind2);
              this.count_ind2 = this.count_ind2 + 1;
            }

            this.countpaid_ind = this.countpaid_ind + 1;
          }
        }
      }, error => {
        console.log('err_paid=>', error);
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

  tracking_product(ind: any) {
   console.log('order_item=>', this.order_item[ind]);
    this.router.navigate(['/user/payHistory/tracking/', this.order_item[ind].id_product]);
  }

}
