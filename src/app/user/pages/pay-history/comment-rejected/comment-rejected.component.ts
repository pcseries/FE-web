import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-comment-rejected',
  templateUrl: './comment-rejected.component.html',
  styleUrls: ['./comment-rejected.component.css']
})
export class CommentRejectedComponent implements OnInit {

  send_text: any;
  status_num = [];

  id_order: any;
  id_item: any;
  order_item: any;

  des_rejected: any;
  pre_page: any;
  des_stat: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.des_stat = false;
    this.send_text = this.route.snapshot.paramMap.get('id');
    this.status_num = this.send_text.split("_");


    this.pre_page = parseInt(this.status_num[0], 10);
    this.id_order = parseInt(this.status_num[1] , 10);
    this.id_item = parseInt(this.status_num[2] , 10);
    this.get_order(this.id_order);

    if (this.pre_page === 5 || this.pre_page === 6) {
      this.des_stat = true;
    }
  }

  get_order(id: any) {
    this.productsService.ongetorder_byid(this.id_order).subscribe(
      res => {
       // console.log('order=>', res['body'].order[0]);
        this.order_item = res['body'].order[0].order_item;

        for (let i = 0 ; i < this.order_item.length; i++) {
          if (this.id_item === this.order_item[i].id_item) {
            // console.log('item=>', this.order_item[i]);
            this.des_rejected = this.order_item[i].description_reject;
            console.log('descrip=>', this.des_rejected);
          }
        }
      }, err => {
        console.log('err_order=>', err);
      }
    );
  }

}
