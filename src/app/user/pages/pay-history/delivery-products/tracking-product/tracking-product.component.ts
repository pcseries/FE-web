import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

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

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.track_level = 0;
    this.url_page = this.route.snapshot.paramMap.get('id');
    this.url_data = this.url_page.split('_');

    this.pre_page = parseInt(this.url_data[0] , 10);

    this.id_order = parseInt(this.url_data[1], 10);
    this.id_item = parseInt(this.url_data[2], 10);

    this.get_tracking();
  }

  get_tracking() {
    this.productsService.ongetorder_byid(this.id_order).subscribe(
      res => {

         console.log('track_data=>', res['body'].order[0].order_item);

        this.order_item = res['body'].order[0].order_item;
        for (let i = 0; i < this.order_item.length; i++) {
          if (this.order_item[i].id_item === this.id_item) {
            console.log('track_data=>', this.order_item[i]);
            this.track_level = this.order_item[i].checkpoint.length;
            for (let j = 0; j < this.track_level; j++) {
                this.track_dtail[j] = this.order_item[i].checkpoint[j];
            }

          }
        }

      }, error => {
        console.log('err_track=>', error);
      }
    );
  }

  on_gopayhistory() {
    this.router.navigate(['/user/payHistory/', this.pre_page]);
  }
}
