import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-score-show',
  templateUrl: './score-show.component.html',
  styleUrls: ['./score-show.component.css']
})
export class ScoreShowComponent implements OnInit {

  send_text: any;
  status_num = [];

  id_orderhistory: any;
  rating_data: any;
  content: any;
  rate: any;

  rate_show: any;
  on_show: any;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    config: NgbRatingConfig,
  ) {
    config.max = 5;
  }

  ngOnInit() {

    this.send_text = this.route.snapshot.paramMap.get('id');
    this.status_num = this.send_text.split("_");

    this.id_orderhistory = parseInt(this.status_num[4], 10);
    this.on_show = parseInt(this.status_num[3], 10);
    this.get_commentScore(this.id_orderhistory);

  }

  get_commentScore(id: any) {
    this.productsService.get_ratingProduct(id).subscribe(
      res => {
        console.log('rating=>', res);

        this.rating_data = res['body'].rating_product;
        this.content = this.rating_data.content;
        this.rate = this.rating_data.rating;
        this.rate_show = this.rate;
      }, err => {
        console.log('rating=>', err);
      }
    );
  }

}
