import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/core/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop-dtail',
  templateUrl: './shop-dtail.component.html',
  styleUrls: ['./shop-dtail.component.css']
})
export class ShopDtailComponent implements OnInit {

  id_shop: any;
  shop_dtail: any;

  name_shop: any;
  email: any;
  phone: any;
  shop_address: any;

  disable: any;
  products: any;
  imageToShow = [];
  isImageLoading: any;


  mean_rate: any = 0;
  p1: number = 1;

  not_rate: any;
  rate_stars = [];
  comments_user: any;

  constructor(
    config: NgbRatingConfig,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,

  ) {
    config.max = 5;
  }

  ngOnInit() {
    this.disable = true;
    this.id_shop = this.route.snapshot.paramMap.get('id');

    this.get_dtailShop();
    this.get_productsShop(this.id_shop);
    this.get_commentsShop(this.id_shop);

  }



  get_dtailShop() {
    this.storeService.get_dtailbyid(this.id_shop).subscribe(
      res => {
        console.log('shop_dtail=>', res['body'][0]);

        this.shop_dtail = res['body'][0];
        this.name_shop = this.shop_dtail.name_shop;
        this.email = this.shop_dtail.email;
        this.phone = this.shop_dtail.phone;
        this.shop_address = this.shop_dtail.shop_address;
      }, err => {
        console.log('shop_dtail=>', err);
      }
    );
  }

  get_productsShop(id: any) {
    this.storeService.get_productsOfshop(id).subscribe(
      res => {
        console.log('pdofshop=>', res['body']);
        this.products = res['body'];

        for (let i = 0; i < this.products.length; i++) {
          this.getImageFromService(this.products[i].id_product, this.products[i].pic[0].pic_product, i);
        }
      }, err => {
        console.log('pdofshop=>', err);
      }
    );
  }


  get_commentsShop(id_shop: any) {
    this.storeService.get_comments(id_shop).subscribe(
      res => {
        console.log('get_commentShop', res);

        if (res['body'].length !== 0) {

          this.comments_user = res['body'];
          this.mean_rate = this.comments_user[0].mean;
          for (let i = 0; i < this.comments_user.length; i++) {
            this.rate_stars[i] = this.comments_user[i].rating;
          }
          this.not_rate = false;
        } else {
          this.not_rate = true;
        }
      }, err => {
        console.log('err', err);
      }
    );
  }

  getImageFromService(id: any , name: any, i: any) {
    this.isImageLoading = true;
    this.productsService.getImage(id, name).subscribe(
      data => {
        this.createImageFromBlob(data, i);
        this.isImageLoading = false;
      }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob, i: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow[i] = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }

 seeProduct(idProduct) {
  //alert(idProduct);
  this.router.navigate(['mado/product/detail', idProduct]);
}

}
