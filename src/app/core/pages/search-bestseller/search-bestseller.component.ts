import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-search-bestseller',
  templateUrl: './search-bestseller.component.html',
  styleUrls: ['./search-bestseller.component.css']
})
export class SearchBestsellerComponent implements OnInit {

  id_search: any;

  head_txt: any;

  products = [];
  imageToShow: any = [];
  price = [];
  isImageLoading: boolean;
  is_empty: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.is_empty = false;
    this.id_search = this.route.snapshot.paramMap.get('id');

    this.get_bestseller(this.id_search);
  }

  get_bestseller(id: any) {
    if (id === '0') {
     // alert('txt');.
     this.head_txt = 'สินค้าขายดีประจำวัน';

      this.productsService.get_BSforday().subscribe(
        res => {
          console.log('day', res['body']);
          this.products = res['body'];
          this.set_image();
        }, err => {
          console.log('day', err);
        }
      );
    } else if (id === '1') {
      this.head_txt = 'สินค้าขายดีประจำสัปดาห์';

      this.productsService.get_BSforweek().subscribe(
        res => {
          console.log('week', res['body']);
          this.products = res['body'];
          this.set_image();
        }, err => {
          console.log('week', err);
        }
      );
    } else if (id === '2') {
      this.head_txt = 'สินค้าขายดีประจำเดือน';
      this.productsService.get_BSformonth().subscribe(
        res => {
          console.log('month', res['body']);
          this.products = res['body'];
          this.set_image();
        }, err => {
          console.log('month', err);
        }
      );
    }



  }

  set_image() {

    if (this.products.length === 0) {
      this.is_empty = true;
    }

    for (let i = 0; i < this.products.length; i++) {
      // console.log('id_product', this.products[i].id_product);
       console.log('name_product_pic',  this.products[i].pic.length);
      if (this.products[i].pic.length !== 0) {
        this.getImageFromService(this.products[i].id_product, this.products[i].pic[0].pic_product, i);
        this.price[i] = this.products[i]['variation'][0].price;
      } else {

        this.imageToShow[i] = 'https://www.condo.fi/wp-content/uploads/2018/11/no-image.png';
      }
    }
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
       // คำนวนค่า last index
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }

 best_day() {

    this.router.navigate(['mado/searchbestseller/0']);
    setTimeout(() => {
      this.ngOnInit();
    }, 100);



}

best_week() {
  if (this.id_search !== '1') {
    this.router.navigate(['mado/searchbestseller/1']);
    setTimeout(() => {
      this.ngOnInit();
    }, 100);

  }

}

best_month() {
  if (this.id_search !== '2') {
    this.router.navigate(['mado/searchbestseller/2']);
    setTimeout(() => {
     this.ngOnInit();
    }, 100);

  }

}

seeProduct(idProduct) {
  // alert(idProduct);
  this.router.navigate(['mado/product/detail', idProduct]);
}

}
