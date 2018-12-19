import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products = [];
  image = [];

  isImageLoading: boolean;
  imageToShow: any = [];
  price = [];
  count: any;

  //product Promotion

  products2 = [];
  image2 = [];


  namePic = [];
  isImageLoading2: boolean;
  imageToShow2: any = [];

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productService.getnewProduct().subscribe(
      response => {
        // this.products = response['body'].product;
        // productList.name = this.products[0].name_product;
        // productList.price = this.products[0].product_variation[0]['price'];
        // this.cart.push(productList);
        this.products = response['body'];
        //console.log('product' , this.products[0]['variation'][0].price);

        //get image แบบลูปและส่ง i ไปด้วย
        for (let i = 0; i < this.products.length; i++) {
          this.getImageFromService(this.products[i].id_product, this.products[i].pic[0].pic_product, i);
          this.price[i] = this.products[i]['variation'][0].price;
        }

      },
      error => {
        console.log('error', error);
      }
     );

     //get Promotion
     this.productService.getPromoProduct().subscribe(
      response => {
        this.products2 = response['body'];
        //console.log('promo' , this.products);
        console.log('oldprice', this.products2);

        for (let i = 0; i < this.products2.length; i++) {

           this.namePic[i] = this.products2[i]['pic'][0];
           //console.log('picture', this.namePic[i].pic_product);
          this.getImageFromService2(this.products2[i].id_product, this.namePic[i].pic_product, i);
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

 getImageFromService2(id: any , name: any, i: any) {
  this.isImageLoading = true;
  this.productService.getImage(id, name).subscribe(
    data => {
      this.createImageFromBlob2(data, i);
      this.isImageLoading = false;
    }, error => {
    this.isImageLoading = false;
    console.log(error);
  });
}

createImageFromBlob2(image: Blob, i: any) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
     this.imageToShow2[i] = reader.result;
  }, false);

  if (image) {
     reader.readAsDataURL(image);
  }
}

}
