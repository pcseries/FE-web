import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/core/store.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-store-manage',
  templateUrl: './store-manage.component.html',
  styleUrls: ['./store-manage.component.css']
})
export class StoreManageComponent implements OnInit {

  public idProduct: any;

  // name_products
  name_images = [];
  imageToShow = [];
  delete_product: FormGroup;


  fileToUpload: File = null;


  constructor(private route: ActivatedRoute
    , private storeService: StoreService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.idProduct = this.route.snapshot.paramMap.get('id');

    // alert(this.idProduct);

    this.storeService.getproductbyID(this.idProduct).subscribe(
      resProduct => {
        console.log('productByid=> ', resProduct);
        this.name_images = resProduct['body']['product'][0]['product_pic'];
        console.log(this.name_images);

        for (let i = 0; i < this.name_images.length ; i++) {
           // console.log('image', this.name_images[0].pic_product.length);

          if (this.name_images[i].pic_product.length !== 0) {
            // ดึงภาพ จาก service

            this.getImageFromService(this.idProduct,
              this.name_images[i].pic_product, i);
          } else {
            this.imageToShow[i] = 'https://www.condo.fi/wp-content/uploads/2018/11/no-image.png';
          }
        }
      }, error => {
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

 handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

uploadFileToActivity() {

  this.storeService.upImageProduct(this.fileToUpload, this.idProduct).subscribe(
    res => {
      alert('upload image successfull');
     // location.reload();
     this.ngOnInit();
     console.log('image=>', res);
    }, error => {
      console.log('error', error);
    }
  );
}


onRemove_product() {
  let c = confirm('Are you sure delete');

  if (c == true) {
    this.delete_product = this.fb.group({
      body: {
        id_product: [this.idProduct]
      }
    });

    console.log('delete_product=> ', this.delete_product.value);
    this.storeService.deleteProduct(this.delete_product.value).subscribe(
      res => {
        console.log('delete_pd_store=>', res);
        this.router.navigate(['/user/store']);
      },
      error => {
        console.log('err_pd_store=>', error);
      }
    )
  }

}


}
