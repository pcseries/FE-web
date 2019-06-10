import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { config } from 'rxjs';

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
  product_status: any;


  status_track = [];
  data_reject: FormGroup;

  loading: any;
  not_loading: any;
  count: any;

  product_delete = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit() {

    this.count = 0;
    this.loading = false;
    this.not_loading = true;
    this.count_ind2 = 0;
    this.countpaid_ind = 0;
    this.get_paidOrder();
  }

  get_paidOrder() {
    this.productsService.get_order().subscribe(
      res => {


        for (let i = 0 ; i < res['body'].order.length; i++) {

           // console.log('get_order=>', res['body'].order[i]);

          if (res['body'].order[i].order_status === 'PAID') {
            this.products_paid[this.countpaid_ind] = res['body'].order[i];
            // console.log('get_paid=>', this.products_paid[this.countpaid_ind]);

            for (let j = 0; j < this.products_paid[this.countpaid_ind].order_item.length; j++) {

              // console.log('products_paid=>', this.products_paid[this.countpaid_ind].order_item[j]);
              this.product_status = this.products_paid[this.countpaid_ind].order_item[j].order_item_status;
              if (this.product_status === 'NOT_SHIP' || this.product_status === 'SHIPPED') {

              this.count = this.count + 1 ;
              this.order_item[this.count_ind2] = this.products_paid[this.countpaid_ind].order_item[j];

              console.log('order_item=>', this.order_item[this.count_ind2]);

              if (this.order_item[this.count_ind2].tracking_number !== undefined) {
                this.tracking_num[this.count_ind2] = this.order_item[this.count_ind2].tracking_number;
              }

              if (this.order_item[this.count_ind2].checkpoint !== undefined) {
                this.status_track[this.count_ind2] = true;
              } else {
                this.status_track[this.count_ind2] = false;
              }

              let price = this.order_item[this.count_ind2].price;
              console.log('price=>', price);
              let quantity = this.order_item[this.count_ind2].quantity;
              console.log('quantity', quantity);

              let price_ship = this.order_item[this.count_ind2].product_delivery.price;

              this.price_all[this.count_ind2] =  (price * quantity ) + price_ship ;
              console.log('price_all', this.price_all[this.count_ind2]);

              let id = this.order_item[this.count_ind2].id_product;
              let picture = this.order_item[this.count_ind2].pic_product;

             // console.log('id=>', id);
             // console.log('pic_name=>', picture);

              this.getImageFromService(id, picture , this.count_ind2);
              this.count_ind2 = this.count_ind2 + 1;
            }

          // if (i === (res['body'].order.length - 1)) {
          //   console.log('reverse');
          //   this.order_item.reverse();

          // }


            }

            this.countpaid_ind = this.countpaid_ind + 1;
          }
        }
        if (this.count === 0) {
          this.not_loading = false;
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
        this.product_delete[i] = false;

      },
      error => {
        this.product_delete[i] = true;
        this.loading = true;
        this.imageToShow[i] = 'https://www.lauriloewenberg.com/wp-content/uploads/2019/04/No_Image_Available.jpg';
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

  tracking_product(ind: any) {
   console.log('order_item=>', this.order_item[ind]);

   const page = '1_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
    this.router.navigate(['/user/payHistory/tracking/', page]);
  }

  on_rejectproduct(ind: any) {

    this.data_reject = this.fb.group({
      id_item: this.order_item[ind].id_item,
      order_item_status: 'REJECTED',
      description_reject: 'ไม่มีข้อคิดเห็น'
    });



    const c = confirm('คุณต้องการยกเลืกการสั่งซื้อ หรือไม่');



    if (c) {
      const i = confirm('คุณต้องการให้ความเห็นการยกเลิก หรือไม่');

      if (i) {
        const pre_page = 1 + '_'  + this.order_item[ind].id_item;
        this.router.navigate(['user/payHistory/addComment/', pre_page]);
      } else {
        console.log('data_reject=>', this.data_reject.value);

        this.productsService.onreject_product(this.data_reject.value).subscribe(
          res => {
            console.log('reject_product=>', res);
            this.router.navigate(['user/payHistory/', 5]);
            setTimeout(() => {
            location.reload();
            }, 1000);

          }, err => {
            console.log('err_reject=>', err);
          }
        );
    }


    // if (c) {
    //   console.log('data_reject=>', this.data_reject.value);

    //   this.productsService.onreject_product(this.data_reject.value).subscribe(
    //     res => {
    //       console.log('reject_product=>', res);
    //       this.router.navigate(['user/payHistory/', 5]);
    //       setTimeout(() => {
    //         location.reload();
    //       }, 1000);

    //     }, err => {
    //       console.log('err_reject=>', err);
    //     }
    //   );
    // }
  }
}


  go_dtail_payhistory(ind: any) {
    // alert('go detail');
    console.log('item', this.order_item[ind]);
    const go = 1 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
     this.router.navigate(['user/payHistory/dtail/', go]);
  }

  see_shop(id_shop) {
    // alert('ดูร้านค้า');
     this.router.navigate(['mado/seeShop/', id_shop]);
   }

}
