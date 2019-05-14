import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { RejectedHistoryComponent } from '../rejected-history/rejected-history.component';


@Component({
  selector: 'app-ordered-history',
  templateUrl: './ordered-history.component.html',
  styleUrls: ['./ordered-history.component.css']
})
export class OrderedHistoryComponent implements OnInit {

  is_ordered: any;


  products_ordered = [];
  order_item = [];
  order_priceAll = [];

  imageToShow = [];


  count_ind: any;
  count_ind2: any;
  cancel_order: FormGroup;

  loading: any;
  not_loading: any;
  count: any;

  order_shows = [];
  item_show = [];
  c_item: any;


  count_shows: any;
  order_present: any;
  ind_image: any;
  c_orders: any;
  keep_ind: any;
  amount_ind = [];
  id_order = [];

  idOrder_shows = [];
  order_ind = [];

  constructor(

    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
  this.keep_ind = 0;
  this.c_orders = -1;
  this.order_present = -1;
  this.count_shows = 0;
  this.count = 0;
  this.not_loading = true;
  this.count_ind = 0;
  this.count_ind2 = 0;
    this.is_ordered = true;
    this.loading = false;
    this.get_ordered();


  }

  get_ordered() {
    this.productsService.get_order().subscribe(
      res => {
        console.log('get_ordered=>', res['body'].order);

         for (let i = 0; i < res['body'].order.length; i++) {

           if (res['body'].order[i].order_status === 'ORDERED') {



           // alert(res['body'].order[i].order_status);
            this.products_ordered[this.count_ind2] = res['body'].order[i];
            this.order_present = this.products_ordered[this.count_ind2].id_order;
           // console.log('products_ordered=>', this.products_ordered[this.count_ind]);
         //  console.log('old_orders=>', this.order_present);

            for (let j = 0; j < this.products_ordered[this.count_ind2].order_item.length; j++) {

              if (this.products_ordered[this.count_ind2].order_item[j].order_item_status === 'UNPAID') {


                let status_Count = true;
                this.order_item[this.count_ind] = this.products_ordered[this.count_ind2].order_item[j];




               console.log('orders_show=>', this.order_shows[this.count_shows]);

                if (this.count_shows !== 0) {

                 let old_ind = this.count_old(this.count_ind);
                // console.log('old_ind=>', old_ind);

                 if (this.allow_acess(this.order_item[this.count_ind].id_order , this.order_item[old_ind].id_order)) {
                 //  console.log('สำเร็จ');
                   this.count_shows = this.count_shows - 1;
                   status_Count = false;
                 }
                }

                console.log('count_shows=>', this.count_shows);
                this.order_shows[this.count_shows] = this.products_ordered[this.count_ind2];
              // console.log('product_presents=>', this.order_item[this.count_ind]);

              if( status_Count ) {
                this.c_orders = this.c_orders + 1;

                console.log('orders=>', this.products_ordered[this.count_ind2]);
                this.amount_ind[this.c_orders] = this.keep_ind;
                this.order_ind[this.c_orders] = this.keep_ind;

                let size = this.products_ordered[this.count_ind2].order_item.length;



                for (let i1 = 0; i1 < size; i1++) {
                  this.keep_ind = this.keep_ind + 1;
                  console.log('count_keep=>', this.keep_ind);

                  // this.on_setImage(this.c_orders , i1 , this.products_ordered[this.count_ind2]);
                }


              }

              //  console.log('d_1', this.count_ind);
                this.count_shows = this.count_shows + 1;

                this.count = this.count + 1;

                this.order_priceAll[this.count_ind] = ((this.products_ordered[this.count_ind2].order_item[j].price *
                  this.products_ordered[this.count_ind2].order_item[j].quantity)
                + this.products_ordered[this.count_ind2].order_item[j].product_delivery.price);

                // console.log('item_orders=>', this.order_item[this.count_ind]);

                this.getImageFromService(this.products_ordered[this.count_ind2].order_item[j].id_product,
                  this.products_ordered[this.count_ind2].order_item[j].pic_product, this.count_ind);

                this.count_ind = this.count_ind + 1;
              }


            }

            this.count_ind2 = this.count_ind2 + 1;
          } else if (res['body'].order[i].order_status  === 'PAID') {

              continue;
          }

          if (i === (res['body'].order.length - 1)) {
            console.log('reverse');
            this.order_item.reverse();
            this.order_shows.reverse();
            this.amount_ind.reverse();
            // console.log('amount_ind', this.amount_ind);
            // console.log('order_ind', this.order_ind);
            console.log('order_show', this.order_shows);

          }
         }

         if (this.count === 0) {
          this.not_loading = false;
        }
      }, error => {
        console.log('err_ordered=>', error);
      }
    );
  }


  on_setImage(ind1: any, ind2: any, data: any) {
    let id = data.order_item[ind2].id_product;
    let name_pic = data.order_item[ind2].pic_product;

    console.log('ind1=>', ind1);
    console.log('ind2=>', ind2);

    // console.log('id=>', id);
    // console.log('pic=>', name_pic);
    this.getImageFromService(id, name_pic, ind1);
  }


  allow_acess(data_old: any, data_present: any) {
    if(data_old === data_present) {
      return true;
    } else {
      return false;
    }
  }

  count_old(data: any) {
    let old_count = data - 1;

    return old_count;
  }

  getImageFromService(id: any, namePic: any, i: any ) {
    this.productsService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data, i );

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

  on_goBuyProduct(ind: any) {
   // alert(this.order_item[ind].id_order);

    localStorage.setItem('amount', this.order_shows[ind].price_total);
     this.router.navigate(['/mado/payorder/', this.order_item[ind].id_order]);

  }

  on_cancelProduct(ind: any) {

    // console.log('delete orders=>', this.order_shows[ind]);
const c = confirm('คุณต้องการยกเลิกคำสั่งซื้อหรือไม่');

        if (c) {

    for (let i = 0; i < this.order_shows[ind].order_item.length; i++) {
      this.cancel_order = this.fb.group({
        id_item: this.order_shows[ind].order_item[i].id_item,
        order_item_status: 'CANCEL_BUYER'
      });

      console.log('cancel_roder=>', this.cancel_order.value);






      this.userService.cancel_order(this.cancel_order.value).subscribe(
      res => {

        console.log('order_cancel=>', res);
        // this.order_item.splice(ind, 1);
        this.order_shows.splice(ind, 1);
        this.ngOnInit();


      }, error => {
        console.log('order_cancel=>', error);
      }
    );

    }

    }


    // console.log('cancel_roder=>', this.cancel_order.value);

    // const c = confirm('คุณต้องการยกเลิกคำสั่งซื้อหรือไม่');




    // if (c) {
    //   this.userService.cancel_order(this.cancel_order.value).subscribe(
    //   res => {

    //     console.log('order_cancel=>', res);
    //     this.order_item.splice(ind, 1);
    //     this.ngOnInit();


    //   }, error => {
    //     console.log('order_cancel=>', error);
    //   }
    // );

    // }

  }

  go_dtail_payhistory(order: any, item: any) {
    // alert('go detail');
    // console.log('item', this.order_item[ind]);
    const go = 0 + '_' + order + '_' + item;
     this.router.navigate(['user/payHistory/dtail/', go]);
  }




}
