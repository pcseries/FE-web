import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { StoreService } from 'src/app/services/core/store.service';
import { ShopcartService } from 'src/app/services/core/shopcart.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  search_txt: any;

  products: any;
  imageToShow = [];
  isImageLoading: any;

  notProducts: any;

  isOpen: any = false;
  status: any;
  shopCart = [];
  show_shop:boolean = false;

  amont: any;
  show_nav: any;

  search_txts: any;

  public id_product: any;

 rec_products = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private storeService: StoreService,
    private shopcartService: ShopcartService,
  ) { }

  ngOnInit() {
    this.notProducts = false;
    this.search_txt = this.route.snapshot.paramMap.get('cm');


    console.log(this.isImageLoading);
    this.productsService.searchProductbyProduct(this.search_txt).subscribe(
      res => {
        console.log('search=>', res['body']);
        this.products = res['body'];

        for (let i = 0; i < this.products.length; i++) {
          console.log('reccommend', this.products[i].recomment);
          if (this.products[i].recomment === 0) {
            this.rec_products[i] = false;
          } else if (this.products[i].recomment === 1) {
            this.rec_products[i] = true;
          }

          this.getImageFromService(this.products[i].id_product, this.products[i].pic[0].pic_product, i);
        }

        if (this.products.length === 0) {
          this.notProducts = true;
        }
      }, err => {
        console.log('search=>', err);
      }
    );

    this.storeService.storeCheck().subscribe(
      res => {
        this.status = res['status'];
        console.log('statusStore', res);
        if (this.status === 401) {
          console.log('statusStore', this.status);
        } else {
          this.isOpen = true;
        }
      },
      err => {
        console.log('errStatus', err);
      }
    );

      this.getShopcart();
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

getShopcart() {
  if (localStorage.getItem('token') !== null) {
     this.shopcartService.getOrder().subscribe(
    res => {
      this.shopCart = res['body']['order'];
      this.amont = 0;
      //console.log('lengthSubnav' , this.shopCart.length);
      for (let i = 0 ; i < this.shopCart.length; i++) {
        if (this.shopCart[i].order_status === 'ORDERING') {
          this.show_shop = true;
          this.amont = this.shopCart[i]['order_item'].length;
        }

      }
      if (this.amont === 0) {
        this.show_shop = false;
      }
    }
  );
  }

}

search_txt1(txt: HTMLInputElement) {

  if (txt.value !== '') {
    this.router.navigate(['searchProducts/', txt.value]);
    setTimeout(() => {
      this.ngOnInit();
    }, 100);

  }
}



}
