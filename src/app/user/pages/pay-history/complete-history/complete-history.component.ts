import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ScoreDialogComponent } from './score-dialog/score-dialog.component';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';


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
  order_history: any;
  stat_score = [];
  get_score = [];
  show_scores = [];

  history_id = [];
  count_his: any;

  product_delete = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    public dialog: MatDialog,
    config: NgbRatingConfig,
  ) {
    config.max = 5;
   }

  ngOnInit() {
    this.count_his = 0;
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


                this.checkStat_score(this.order_item[this.count_ind2].id_item, this.count_ind2);

                if (this.order_item[this.count_ind2].tracking_number !== undefined) {
                  this.tracking_num[this.count_ind2] = this.order_item[this.count_ind2].tracking_number;
                }


                let price = this.order_item[this.count_ind2].price;
              let quantity = this.order_item[this.count_ind2].quantity;
              let price_ship = this.order_item[this.count_ind2].product_delivery.price;

                this.price_all[this.count_ind2] =  (price * quantity ) + price_ship ;

                let id = this.order_item[this.count_ind2].id_product;
                let picture = this.order_item[this.count_ind2].pic_product;

                this.getImageFromService(id, picture , this.count_ind2);

                this.count_ind2 = this.count_ind2 + 1;
              }


            }
            this.countpaid_ind = this.countpaid_ind + 1;

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
        console.log('error', err);
      }
    );
  }


  checkStat_score(id_item: any, ind: any) {
   // console.log('id_item=>', id_item);

    this.productsService.get_orderHistory().subscribe(
      res => {
        console.log('order=>', res['body']);
        let order_his = res['body'].order_history;

        for (let i = 0; i < order_his.length; i++) {
          if (order_his[i].id_item === id_item) {
            console.log('id_orderhistory=>', order_his[i].id_order_history);
            this.history_id[this.count_his] = order_his[i].id_order_history;
            this.count_his = this.count_his + 1;
            this.productsService.get_ratingProduct(order_his[i].id_order_history).subscribe(
              res => {
                console.log('rating', res);

                if (res['status'] === 200) {
                  this.stat_score[ind] = true;
                  this.get_score[ind] = res['body'].rating_product.rating;
                  this.show_scores[ind] = res['body'].rating_product.rating;
                } else {
                  this.stat_score[ind] = false;
                }

              }, err => {
                console.log('rating', err);
              }
            );
          }
        }
      }, err => {
        console.log('order=>', err);
      }
    );
  }

  go_dtailScore(ind: any) {
    this.router.navigate(['user/payHistory/setScore/', this.order_item[ind].id_item]);
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
    if (this.stat_score[ind] === true) {
      console.log('item', this.order_item[ind]);
      const go = 3 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item +
      '_1_' + this.history_id[ind];
 this.router.navigate(['user/payHistory/dtail/', go]);
    } else {
      const go = 3 + '_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item +
      '_0' ;
      this.router.navigate(['user/payHistory/dtail/', go]);
    }



  }

  on_setScore(ind: any) {
    // console.log('id_item=>', this.order_item[ind].id_item);

     this.productsService.get_orderHistory().subscribe(
       res => {
       //  console.log('order_history', res['body'].order_history);
         let order = res['body'].order_history;

         for (let i = 0; i < order.length; i++) {
           if (this.order_item[ind].id_item === order[i].id_item) {
              console.log('order_history=>', order[i].id_order_history);
              const dialogRef = this.dialog.open(ScoreDialogComponent, {
                width: '700px',
                data: {id: order[i].id_order_history}
               });

               dialogRef.afterClosed().subscribe(result => {
                 if (result === true) {
                    this.ngOnInit();
                 }


              });
           }
         }
       }, err => {
         console.log('order_history', err);
       }
     );

  }

  go_setScore(ind: any) {
    this.router.navigate(['user/payHistory/setScore/', this.order_item[ind].id_item]);
  }

  tracking_product(ind: any) {

    const page = '3_' + this.order_item[ind].id_order + '_' + this.order_item[ind].id_item;
    console.log('order_item=>', this.order_item[ind]);
     this.router.navigate(['/user/payHistory/tracking/', page]);
   }

   see_shop(id_shop) {
    // alert('ดูร้านค้า');
     this.router.navigate(['mado/seeShop/', id_shop]);
   }

}
