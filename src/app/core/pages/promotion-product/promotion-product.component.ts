import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-promotion-product',
  templateUrl: './promotion-product.component.html',
  styleUrls: ['./promotion-product.component.css']
})
export class PromotionProductComponent implements OnInit {

  products = [];
  image = [];

  isImageLoading: boolean;
  imageToShow: any = [];

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {

    this.productService.getPromoProduct().subscribe(
      response => {
        this.products = response['body'];
        console.log('promo' , this.products);

        for (let i = 0; i < this.products.length; i++) {
          this.getImageFromService(this.products[i].id_product, this.products[i].pic_product, i);
        }
      } ,
      error => {
        console.log('error', error);
      }
    );

  }

  seeProduct(idProduct) {
    //alert(idProduct);
    this.router.navigate(['mado/product/detail', idProduct]);
  }

  getImageFromService(id: any , name: any, i: any) {
    this.isImageLoading = true;
    this.productService.getImage(id, name).subscribe(
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


}
