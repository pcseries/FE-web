import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopcartService } from 'src/app/services/core/shopcart.service';
import { Router } from '@angular/router';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

export interface Variation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  providers: [ProductsService, ShopcartService]
})
export class CardProductComponent implements OnInit {

  nameProduct: string;
  picTure: any;
  isImageLoading: boolean;
  imageToShow = [];
  imageBigshow: any;
  isSelected: any;

  image5 = [];

  @Input() idProduct: any;
  descript: any;
  price: any;
  basePrice: any;
  progress = false;
  //quantity
  variations = [];
  loop: any;

  selectedValue: any;
  amountAll: any;
  amount: any = 1; //ยังไม่ใช้

  product: FormGroup;
  id_variation: any;
  canAdd: boolean = true;
  canReduce: boolean = true;
  noKey: boolean = true;

  //ปริมาณ


  constructor( private productService: ProductsService,
    private fb: FormBuilder, private shopService: ShopcartService,
    private router: Router) { }

  ngOnInit() {
this.isSelected = 0;
 this.productService.detailProduct(this.idProduct).subscribe(
      response => {
        // this.nameProduct = response['body'].product[0].name_product;
        // this.picTure = response['body'].product[0].product_pic[0].pic_product;
        // this.price = response['body'].product[0].product_variation[0].price;
        // this.descript = response['body'].product[0].description;
        //alert(this.picTure);
        //console.log('response', response);
        //this.getImageFromService(this.idProduct , this.picTure);

        //console.log('res', response);
        this.nameProduct = response['body'][0].name_product;

        //console.log('picture', this.picTure);
        this.price =  response['body'][0]['variation'][0].price;
        this.basePrice = this.price;
        this.id_variation = response['body'][0]['variation'][0].id_variation;
        console.log('variation', response['body'][0]['variation']);

        this.variations = response['body'][0]['variation'];
        this.amountAll = response['body'][0]['variation'][0].stock;
        this.selectedValue = 0;


        //console.log('pic', response['body'][0]['pic']);

        for (let i = 0; i < response['body'][0]['pic'].length; i++) {
          this.picTure = response['body'][0]['pic'][i];
          //console.log('pic', this.picTure.pic_product);
          this.getImageFromService(this.idProduct , this.picTure.pic_product, i);
        }

      },
      error => {
        console.log('error' , error);
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


  createImageFromBlob(image: Blob , i: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow[i] = reader.result;
       this.imageBigshow = this.imageToShow[0];
       this.progress = true;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }


 addProduct() {
  //alert("add");

  if (localStorage.getItem('token') === null) {
    alert('Please login');

  }
  this.product = this.fb.group(
    {
      body: [{
        order_status: "ORDERING",
        order_item: [
          {
            id_variation: this.id_variation,
            quantity: this.amount
          }
        ]
      }]
    }
  );

  console.log(this.product.value);

  this.shopService.addProduct(this.product.value).subscribe(
    res => {
      alert("เพิ่มสินค้าสำเร็จ");
      location.reload();
      console.log('resShop', res);
    },
    error => {
      console.log('err', error);
    }
  );

 }

 changeVariation() {
   //alert(this.selectedValue);
   this.price = this.variations[this.selectedValue].price;
   this.basePrice = this.price;
   //console.log('priceVariation', this.price);
   this.amountAll = this.variations[this.selectedValue].stock;
   if (this.amount > this.amountAll) {
     this.amount = this.amountAll;
   }
 }

addAmount() {
  this.amount++;
  this.canReduce = true;
  if (this.amount > this.amountAll) {
    this.amount = this.amountAll;
  } else {
    this.price = this.price + this.basePrice;
  }

}

reduceAmount() {
  if (this.amount === 1) {
    this.canReduce = false;
    this.amount = 1;
  } else {
    this.amount--;
    this.price = this.price - this.basePrice;
  }

}

changeMainImage(index: any) {
  this.imageBigshow = this.imageToShow[index];
  this.isSelected = index;
}


}
