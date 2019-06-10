import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-recommend',
  templateUrl: './all-recommend.component.html',
  styleUrls: ['./all-recommend.component.css']
})
export class AllRecommendComponent implements OnInit {

  products = [];

  imageToShow: any = [];
  price = [];
  isImageLoading: boolean;
  lastIndex: any;

  notProducts: any;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.notProducts = false;
    this.get_allrecproducts();
  }

  get_allrecproducts() {
    this.productsService.get_allreccomProducts().subscribe(
      res => {
        console.log('all_products', res['body']);
        this.products = res['body'];

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

        if (this.products.length === 0) {
          this.notProducts = true;
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
       // คำนวนค่า last index
      this.lastIndex = i;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }


 seeProduct(idProduct) {
  // alert(idProduct);
  this.router.navigate(['mado/product/detail', idProduct]);
}



}
