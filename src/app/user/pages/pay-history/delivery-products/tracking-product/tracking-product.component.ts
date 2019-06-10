import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-tracking-product',
  templateUrl: './tracking-product.component.html',
  styleUrls: ['./tracking-product.component.css']
})
export class TrackingProductComponent implements OnInit {

  track_level: any;
  id_order: any;

  url_data = [];
  track_dtail = [];
  pre_page: any;

  url_page: any;
  id_item: any;

  order_item: any;

  complete_stat: any;
  ind_final: any;

  track_Start = [];
  track_final = [];
  ind_dtail: any;

  load_track: any;

  num_track: any;

  status_track: any;
  buyer_track: any;
  check_page: any;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.status_track = false;
    this.load_track = false;
    this.ind_dtail = 0;
    this.ind_final = 0;
    this.complete_stat = false;
    this.track_level = 0;
    this.url_page = this.route.snapshot.paramMap.get('id');
    this.url_data = this.url_page.split('_');

    this.pre_page = parseInt(this.url_data[0] , 10);




    if (this.url_data[0] === 'seller') {

      this.id_item = parseInt(this.url_data[1], 10);
      this.check_page = parseInt(this.url_data[2], 10);
      this.get_trackBuyer(this.id_item);
    } else {
      this.id_order = parseInt(this.url_data[1], 10);
      this.id_item = parseInt(this.url_data[2], 10);
      this.get_tracking();
    }

  }


  get_trackBuyer(id: any) {

    this.productsService.get_productsellByid(id).subscribe(
      res => {
        console.log('track_data=>', res['body'].order_item[0]);
        this.buyer_track = res['body'].order_item[0];

        if (this.buyer_track.length === 0) {
          this.status_track = true;
        }

        this.num_track = this.buyer_track.tracking_number;
        this.track_level = this.buyer_track.checkpoint.length;
        for (let j = 0; j < this.track_level; j++) {

          // แยกเป็น 2 อันว่า มันสำเร็จกับไม่สำเร็จ
          if (this.check_page === 3) {
            if (j === 0) {
            this.track_Start[0] = this.buyer_track.checkpoint[j];
            } else if (j === (this.track_level - 1)) {
              this.track_final[0] = this.buyer_track.checkpoint[j];
              this.complete_stat = true;
              this.load_track = true;
            } else {
            this.track_dtail[this.ind_dtail] = this.buyer_track.checkpoint[j];
            this.ind_dtail = this.ind_dtail + 1;
           }
          } else if (this.check_page === 2) {
            if (j === 0) {
              this.track_Start[0] = this.buyer_track.checkpoint[j];
              this.load_track = true;
            } else {
              this.track_dtail[this.ind_dtail] = this.buyer_track.checkpoint[j];
              this.ind_dtail = this.ind_dtail + 1;
              if (j === (this.track_level - 1)) {
                this.load_track = true;
              }
            }
          }





        }

      }, err => {
        console.log('err_track=>', err);
      }
    );
  }

  get_tracking() {
    this.productsService.ongetorder_byid(this.id_order).subscribe(
      res => {

         console.log('track_data=>', res['body'].order[0].order_item);

        this.order_item = res['body'].order[0].order_item;
        for (let i = 0; i < this.order_item.length; i++) {
          if (this.order_item[i].id_item === this.id_item) {
            console.log('track_data=>', this.order_item[i]);

            if(this.order_item[i].checkpoint.length === 0) {
              this.status_track = true;
            }

            this.num_track = this.order_item[i].tracking_number;
            this.track_level = this.order_item[i].checkpoint.length;
            for (let j = 0; j < this.track_level; j++) {
              if (this.pre_page === 1) {
              if (j === 0) {
                this.track_Start[0] = this.order_item[i].checkpoint[j];
                this.load_track = true;
              } else {
                this.track_dtail[this.ind_dtail] = this.order_item[i].checkpoint[j];
                this.ind_dtail = this.ind_dtail + 1;
                if (j === (this.track_level - 1)) {
                  this.load_track = true;
                }
              }

            } else if (this.pre_page === 2 || this.pre_page === 3 || this.pre_page === 9) {
              if (j === 0) {
                this.track_Start[0] = this.order_item[i].checkpoint[j];
              } else if (j === (this.track_level - 1)) {
                this.track_final[0] = this.order_item[i].checkpoint[j];
                this.complete_stat = true;
                this.load_track = true;
              } else {
                this.track_dtail[this.ind_dtail] = this.order_item[i].checkpoint[j];
                this.ind_dtail = this.ind_dtail + 1;
              }
            }

            }

          }
        }

      }, error => {
        console.log('err_track=>', error);
        this.status_track = true;
      }
    );
  }

  on_gopayhistory() {

    if (this.url_data[0] === 'seller') {
      let page = localStorage.getItem('prepage');
      localStorage.removeItem('prepage');
      this.router.navigate(['user/sellProducts/manage-ordered/', page]);
    } else {
      this.router.navigate(['/user/payHistory/', this.pre_page]);
    }

  }
}
