import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  providers: [ProductsService]
})
export class CardProductComponent implements OnInit {

  nameProduct: string;
  picTure: any;

  isImageLoading: boolean;
  imageToShow: any;
  @Input() idProduct: any;
  variation: any;
  descript: any;
  price: any;

  constructor( private productService: ProductsService) { }

  ngOnInit() {

 this.productService.detailProduct(this.idProduct).subscribe(
      response => {
        this.nameProduct = response['body'].product[0].name_product;
        this.picTure = response['body'].product[0].product_pic[0].pic_product;
        this.price = response['body'].product[0].product_variation[0].price;
        this.descript = response['body'].product[0].description;
        //alert(this.picTure);
        //console.log('response', response);
        this.getImageFromService(this.idProduct , this.picTure);
      },
      error => {
        console.log('error' , error);
      }
    );
  }

  getImageFromService(id: any , namePic: any) {
    this.isImageLoading = true;
    this.productService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }




}
