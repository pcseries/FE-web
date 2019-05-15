import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments-product',
  templateUrl: './comments-product.component.html',
  styleUrls: ['./comments-product.component.css']
})
export class CommentsProductComponent implements OnInit {

  idProduct: any;
  comments_user: any;
  rate_stars = [];

  constructor(
    private produtsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idProduct = this.route.snapshot.paramMap.get('id');

    this.produtsService.get_comments(this.idProduct).subscribe(
      res => {
        console.log('comment=>', res['body']);
        this.comments_user = res['body'];
        for (let i = 0; i < this.comments_user.length; i++) {
          this.rate_stars[i] = this.comments_user[i].rating;
        }
      }, err => {
        console.log('comment=>', err);
      }
    );
  }

}
