import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { StoreService } from 'src/app/services/core/store.service';

@Component({
  selector: 'app-set-score',
  templateUrl: './set-score.component.html',
  styleUrls: ['./set-score.component.css']
})
export class SetScoreComponent implements OnInit {

  rate_product = 0;
  rate_shop = 0;
  show_product: any;
  show_shop: any;
  id_item: any;
  idOrder_history: any;

  form_product: FormGroup;
  form_shop: FormGroup;

  showrate_product: any;
  showcontent_product: any;

  showrate_shop: any;
  showcontent_shop: any;
  status_shop: any;
  status_product: any;

  constructor(
    config: NgbRatingConfig,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private storeService: StoreService
  ) {
    config.max = 5;
   }

  ngOnInit() {
    this.status_product = false;
    this.status_shop = false;
    this.show_product = false;
    this.show_shop = false;

    this.id_item = this.route.snapshot.paramMap.get('id');
    this.id_item = parseInt(this.id_item, 10);
    this.get_idorderHistory();

  }


  get_idorderHistory() {
    this.productsService.get_orderHistory().subscribe(
      res => {
        console.log('order_history', res);
         let order = res['body'].order_history;

         for (let i = 0; i < order.length; i++) {
           if (this.id_item === order[i].id_item) {
             console.log('order_history=>', order[i].id_order_history);
             this.idOrder_history = order[i].id_order_history;
           }
         }
         this.get_scoreProduct();
         this.get_scoreShop();
        }, err => {
          console.log('error', err);
        }
    );
  }

  get_scoreProduct() {
    this.productsService.get_ratingProduct(this.idOrder_history).subscribe(
      res => {
        this.status_product = true;
        console.log('res rate', res['body'].rating_product);
        let data_pd = res['body'].rating_product;
        this.showrate_product = data_pd.rating;
        this.showcontent_product = data_pd.content;
      }, err => {
        console.log('err', err);
      }
    );
  }

  get_scoreShop() {
    this.storeService.get_rate(this.idOrder_history).subscribe(
      res => {
        this.status_shop = true;
        console.log('res shop', res['body'].rating_shop);
        let data = res['body'].rating_shop;

        this.showrate_shop = data.rating;
        this.showcontent_shop = data.content;
      }, err => {
        console.log('err', err);
      }
    );
  }


  // on_setScore(product_txt: HTMLInputElement, shop_txt: HTMLInputElement) {

  //   this.productsService.get_orderHistory().subscribe(
  //     res => {
  //       console.log('order_history', res);
  //       let order = res['body'].order_history;

  //       for (let i = 0; i < order.length; i++) {
  //         if (this.id_item === order[i].id_item) {
  //           console.log('order_history=>', order[i].id_order_history);
  //           this.idOrder_history = order[i].id_order_history;
  //         }
  //       }

  //       if (this.show_product) {

  //        console.log('txt', product_txt);

  //         this.form_product = this.fb.group({
  //           id_order_history: this.idOrder_history,
  //           rating: this.rate_product,
  //           content: product_txt.value
  //         });

  //         console.log('form_product', this.form_product.value);

  //       }

  //       if (this.show_shop) {
  //         // if (shop_txt === undefined) {
  //         //   shop_txt = '';
  //         //   console.log(shop_txt);
  //         //   console.log('rate_shop', this.rate_shop);
  //         // }

  //         this.form_shop = this.fb.group({
  //           id_order_history: this.idOrder_history,
  //           rating: this.rate_shop,
  //           content: shop_txt.value
  //         });

  //         console.log('form_shop', this.form_shop.value);

  //       }


  //     } , err => {
  //       console.log('error', err);
  //     }
  //   );



  // }



  on_setProduct(txt_product: HTMLInputElement) {
    console.log(txt_product.value);



        if (this.show_product) {


          this.form_product = this.fb.group({
            id_order_history: this.idOrder_history,
            rating: this.rate_product,
            content: txt_product.value
          });

          console.log('form_product', this.form_product.value);

          this.productsService.set_Scoreforproduct(this.form_product.value).subscribe(
            res => {
              console.log('rate=>', res);
              alert('บันทึกคะแนนสำเร็จ');
              this.ngOnInit();
            }, err => {
              console.log('rate=>', err);
            }
          );


        }

  }

  on_setShop(txt_shop: HTMLInputElement) {

        if (this.show_shop) {
          this.form_shop = this.fb.group({
            id_order_history: this.idOrder_history,
            rating: this.rate_shop,
            content: txt_shop.value
          });

          console.log('form_shop', this.form_shop.value);

          this.storeService.set_rate(this.form_shop.value).subscribe(
            res => {
              console.log('rate_shop', res);
              alert('บันทึกคะแนนร้านค้าสำเร็จ');
              this.ngOnInit();
            }, err => {
              console.log('err', err);
            }
          );
        }


  }

  on_backPage() {
    this.router.navigate(['user/payHistory/3']);
  }
}
