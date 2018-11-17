import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/admin/user.service';
import { ProductsService } from '../services/core/products.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [ProductsService]
})
export class ImageComponent implements OnInit {

  imageToShow: any;
  isImageLoading: boolean;

  constructor(private imageService: UserService, private productsService: ProductsService) { }

  ngOnInit() {
    // this.getImageFromService();
  }

  // getImageFromService() {
  //   this.isImageLoading = true;
  //   this.productsService.getImage().subscribe(
  //     data => {
  //       this.createImageFromBlob(data);
  //       this.isImageLoading = false;
  //     }, error => {
  //     this.isImageLoading = false;
  //     console.log(error);
  //   });
  // }

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
