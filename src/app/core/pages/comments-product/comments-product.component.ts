import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comments-product',
  templateUrl: './comments-product.component.html',
  styleUrls: ['./comments-product.component.css']
})
export class CommentsProductComponent implements OnInit {

  idProduct: any;
  comments_user: any;
  rate_stars = [];


  p1: number = 1;

  currentRate = 3;
  mean_rate: any;

  not_rate: any;
  constructor(
    private produtsService: ProductsService,
    private route: ActivatedRoute,
    config: NgbRatingConfig,
  ) {
    config.max = 5;
  }

  ngOnInit() {

    this.idProduct = this.route.snapshot.paramMap.get('id');

    this.produtsService.get_comments(this.idProduct).subscribe(
      res => {
        console.log('comment=>', res['body']);

        if (res['body'].length !== 0) {
          this.comments_user = res['body'];
          this.mean_rate = this.comments_user[0].mean;
          console.log('mean_rate', this.mean_rate);
          for (let i = 0; i < this.comments_user.length; i++) {
            this.rate_stars[i] = this.comments_user[i].rating;
          }
          this.not_rate = false;
        } else {
          this.not_rate = true;
        }


      }, err => {
        console.log('comment=>', err);
      }
    );
  }

}
