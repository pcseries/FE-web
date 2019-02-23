import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/core/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-add-image-product',
  templateUrl: './add-image-product.component.html',
  styleUrls: ['./add-image-product.component.css']
})
export class AddImageProductComponent implements OnInit {

  public id_product: any;

  fileToUpload: File = null;

  product_store: any;
  product_variation: any;

  imageToShow = [];
  name_images = [];

  constructor(private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit() {
    this.id_product = this.route.snapshot.paramMap.get('id');


    this.storeService.getproductbyID(this.id_product).subscribe(
      resProduct => {
        console.log('productByid=> ', resProduct);
        this.name_images = resProduct['body']['product'][0]['product_pic'];
        console.log(this.name_images);

        for (let i = 0; i < this.name_images.length ; i++) {
           // console.log('image', this.name_images[0].pic_product.length);

          if (this.name_images[i].pic_product.length !== 0) {
            // ดึงภาพ จาก service

            this.getImageFromService(this.id_product,
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {

    this.storeService.upImageProduct(this.fileToUpload, this.id_product).subscribe(
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

  onSuccess_add() {
    this.router.navigate(['/user/store']);
  }

}
