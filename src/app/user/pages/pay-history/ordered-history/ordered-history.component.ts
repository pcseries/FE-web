import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';


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

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
  this.count_ind = 0;
  this.count_ind2 = 0;
    this.is_ordered = true;
    this.get_ordered();

  }

  get_ordered() {
    this.productsService.get_order().subscribe(
      res => {
        console.log('get_ordered=>', res['body'].order);

         for (let i = 0; i < res['body'].order.length; i++) {


           if (res['body'].order[i].order_status === 'ORDERED') {
        //     // alert(res['body'].order[i].order_status);
            this.products_ordered[this.count_ind2] = res['body'].order[i];
            console.log('products_ordered=>', this.products_ordered[this.count_ind]);

            for (let j = 0; j < this.products_ordered[this.count_ind2].order_item.length; j++) {

              if (this.products_ordered[this.count_ind2].order_item[j].order_item_status === 'UNPAID') {

                console.log('order=>',  this.products_ordered[this.count_ind2]);
                this.order_item[this.count_ind] = this.products_ordered[this.count_ind2].order_item[j];

                // console.log('order_item=>', this.order_item[this.count_ind]);

                this.order_priceAll[this.count_ind] = ((this.products_ordered[this.count_ind2].order_item[j].price *
                  this.products_ordered[this.count_ind2].order_item[j].quantity)
                + this.products_ordered[this.count_ind2].order_item[j].product_delivery.price);


                this.getImageFromService(this.products_ordered[this.count_ind2].order_item[j].id_product,
                  this.products_ordered[this.count_ind2].order_item[j].pic_product, this.count_ind);

                this.count_ind = this.count_ind + 1;
              }

            }

            this.count_ind2 = this.count_ind2 + 1;
          } else if (res['body'].order[i].order_status  === 'PAID') {
              continue;
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

  on_goBuyProduct(ind: any) {
   // alert(this.order_item[ind].id_order);

    localStorage.setItem('amount', this.order_priceAll[ind]);
     this.router.navigate(['/mado/payorder/', this.order_item[ind].id_order]);

  }

  on_cancelProduct(ind: any) {

    this.cancel_order = this.fb.group({
      id_item: this.order_item[ind].id_item,
      order_item_status: 'CANCEL_BUYER'
    });

    console.log('cancel_roder=>', this.cancel_order.value);

    const c = confirm('คุณต้องการยกเลิกคำสั่งซื้อหรือไม่');




    if (c) {
      this.userService.cancel_order(this.cancel_order.value).subscribe(
      res => {

        console.log('order_cancel=>', res);
        this.order_item.splice(ind, 1);
        this.ngOnInit();


      }, error => {
        console.log('order_cancel=>', error);
      }
    );

    }

  }




}
