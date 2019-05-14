import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from 'src/app/core/shared/allProduct/products/products.component';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-precomplete-history',
  templateUrl: './precomplete-history.component.html',
  styleUrls: ['./precomplete-history.component.css']
})
export class PrecompleteHistoryComponent implements OnInit {


  count_ind2: any;
  count_ind: any;
  countpaid_ind = 0;

  products_delivery = [];
  order_item = [];

  product_status: any;
  price_all = [];
  imageToShow = [];

  tracking_num = [];
  count_for: any;
  data_complete: FormGroup;

  loading: any;
  not_loading: any;

  count: any;
  data_reject: FormGroup;


  constructor(
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.not_loading = true;
    this.count = 0;
    this.loading = false;
    this.count_for = 0;
    this.count_ind2 = 0;
    this.countpaid_ind = 0;
    this.get_delivery();
  }



  get_delivery() {
    this.productsService.get_order().subscribe(
      res => {
         console.log('get_delivery=>', res['body'].order);

        for (let i = 0 ; i < res['body'].order.length; i++) {

          if (res['body'].order[i].order_status === 'PAID') {
            this.products_delivery[this.countpaid_ind] = res['body'].order[i];

            for (let j = 0; j < this.products_delivery[this.countpaid_ind].order_item.length; j++) {
              this.product_status = this.products_delivery[this.countpaid_ind].order_item[j].order_item_status;
             // console.log('products_delivery=>', this.product_status);

              if (this.product_status === 'DELIVERED') {

                this.count = this.count + 1;
                console.log('delivery_product=>', this.products_delivery[this.countpaid_ind]);
               // console.log('count_paid=>', this.countpaid_ind);
               // console.log('count for', this.count_for);
               // console.log('products_delivery=>', this.product_status);
                this.order_item[this.count_ind2] = this.products_delivery[this.countpaid_ind].order_item[j];


                if (this.order_item[this.count_ind2].tracking_number !== undefined) {
                  this.tracking_num[this.count_ind2] = this.order_item[this.count_ind2].tracking_number;
                }

                this.price_all[this.count_ind2] = this.products_delivery[this.countpaid_ind].price_total;


              // console.log('order_item=>', this.order_item[this.count_ind2]);
              // id and picture_name
              let id = this.order_item[this.count_ind2].id_product;
              let picture = this.order_item[this.count_ind2].pic_product;

             // console.log('id=>', id);
             // console.log('pic_name=>', picture);

              this.getImageFromService(id, picture , this.count_ind2);

              this.count_ind2 = this.count_ind2 + 1;
              }

            }

            this.count_for = this.count_for + 1;
            this.countpaid_ind = this.countpaid_ind + 1;
          } else if (this.product_status === 'PAID') {

            continue;
          }

        }

        if (this.count === 0) {
          this.not_loading = false;
        }
      }, err => {
        console.log('err_delivery=>', err);
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

  tracking_product(ind: any) {

    const page = '2_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
    console.log('order_item=>', this.order_item[ind]);
     this.router.navigate(['/user/payHistory/tracking/', page]);
   }

   on_complete(ind: any) {
    // alert(this.order_item[ind].id_item);
    this.data_complete = this.fb.group({
      id_item: this.order_item[ind].id_item,
      order_item_status: 'COMPLETED'
    });

    console.log('update_data=>', this.data_complete.value);

    const c = confirm('คุณต้องการยอมรับสินค้าหรือไม่');

    if (c) {
      this.productsService.update_complete(this.data_complete.value).subscribe(
        res => {
          console.log('on complete=>');
          this.router.navigate(['user/payHistory/3']);
          setTimeout(() => {
           location.reload();
          }, 800);
        }, err => {
          console.log('err_complete=>', err);
        }
      );
    }
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
        const pre_page = 2 + '_'  + this.order_item[ind].id_item;
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

    }
   }


   go_dtail_payhistory(ind: any) {
    // alert('go detail');
    console.log('item', this.order_item[ind]);
    const go = 2 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
     this.router.navigate(['user/payHistory/dtail/', go]);
  }

}
