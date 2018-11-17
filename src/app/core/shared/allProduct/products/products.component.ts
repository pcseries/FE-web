import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { CartShop } from './cart-shop';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  image = [];

  isImageLoading: boolean;
  imageToShow: any = [];
  cart: Array<CartShop> = [];


  count: any;

  //ทำในส่วนการดึง image ด้วย

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    let productList = new CartShop();
    let size = 0;

     this.productService.getnewProduct().subscribe(
      response => {
        // this.products = response['body'].product;
        // productList.name = this.products[0].name_product;
        // productList.price = this.products[0].product_variation[0]['price'];
        // this.cart.push(productList);
        this.products = response['body'];
        console.log('product' , this.products);

        //get image แบบลูปและส่ง i ไปด้วย
        for (let i = 0; i < this.products.length; i++) {
          this.getImageFromService(this.products[i].id_product, this.products[i].pic_product, i);
        }

      },
      error => {
        console.log('error', error);
      }
     );

  }

  seeProduct(idProduct) {
    //alert(idProduct);
    this.router.navigate(['product/detail', idProduct]);
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
