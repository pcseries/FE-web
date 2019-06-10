import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommend-products',
  templateUrl: './recommend-products.component.html',
  styleUrls: ['./recommend-products.component.css']
})
export class RecommendProductsComponent implements OnInit {

  products = [];
  image = [];

  isImageLoading: boolean;
  imageToShow: any = [];
  price = [];
  count: any;

  lastIndex: any;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.get_reccomProducts().subscribe(
      response => {
        // this.products = response['body'].product;
        // productList.name = this.products[0].name_product;
        // productList.price = this.products[0].product_variation[0]['price'];
        // this.cart.push(productList);
        this.products = response['body'];
        console.log('reccommend', this.products);
        // console.log('product' , this.products[0]['variation'][0].price);

        // get image แบบลูปและส่ง i ไปด้วย

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

      },
      error => {
        console.log('error', error);
      }
     );

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
