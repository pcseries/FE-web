import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/core/store.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-products-store',
  templateUrl: './list-products-store.component.html',
  styleUrls: ['./list-products-store.component.css']
})
export class ListProductsStoreComponent implements OnInit {

  product_store: any;
  product_variation: any;

  imageToShow = [];
  status_product = [];
  text_status = [];
  index_product = [];

  edit_status: FormGroup;

  constructor(private storeService: StoreService,
    private productService: ProductsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.storeService.getProduct_store().subscribe(
      res => {
        this.product_store = res['body']['product'];
        this.product_variation = this.product_store[0].product_variation;
        console.log('productOfStore', this.product_store);
        console.log('productVariation', this.product_variation);



        // เอารูปจาก สินค้าทั้งหมด

        for (let i = 0; i < this.product_store.length ; i++) {
        // เชค status ของ สินค้า

          if (this.product_store[i].product_status === 'NOT_SHOW') {
            console.log('status_product', this.product_store[i].product_status);
            this.status_product.push(false);
            this.index_product.push(i);
          } else {
            this.status_product.push(true);
            this.index_product.push(i);
          }

        // ================= [END] ==================

          if (this.product_store[i].product_pic.length !== 0) {
            // ดึงภาพ จาก service
            this.getImageFromService(this.product_store[i].id_product,
              this.product_store[i].product_pic[0].pic_product, i);
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


  // สร้างตัว Image Product

  getImageFromService(id: any , name: any, i: any) {

    this.productService.getImage(id, name).subscribe(
      data => {
        this.createImageFromBlob(data, i);

      }, error => {
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

 onManage_Product(index: any) {


  this.router.navigate(['user/store/manageStore', this.product_store[index].id_product]);
 }

 changeStatus_product(index: any) {
   // alert('change');
  // alert(index);
  if (this.product_store[index].product_status === 'NOT_SHOW') {
    console.log('id_product', this.product_store[index].id_product);
  this.edit_status = this.fb.group({
    body: {
      id_product: this.product_store[index].id_product,
      product_status: 'SHOW'
    }
  });

  console.log('data_edit', this.edit_status.value);



} else if (this.product_store[index].product_status === 'SHOW') {

  this.edit_status = this.fb.group({
    body: {
      id_product: this.product_store[index].id_product,
      product_status: 'NOT_SHOW'
    }
  });

}
 this.storeService.editofProduct(this.edit_status.value).subscribe(
    res => {
      console.log('status_res=>', res);

    }, error => {
      console.log('error', error);
    }
  );
 }


}
