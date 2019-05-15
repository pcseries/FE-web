import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  search_txt: any;

  products: any;
  imageToShow = [];
  isImageLoading: any;

  notProducts: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.notProducts = false;
    this.search_txt = this.route.snapshot.paramMap.get('cm');
    console.log(this.isImageLoading);
    this.productsService.searchProductbyProduct(this.search_txt).subscribe(
      res => {
        console.log('search=>', res['body']);
        this.products = res['body'];

        for (let i = 0; i < this.products.length; i++) {
          this.getImageFromService(this.products[i].id_product, this.products[i].pic[0].pic_product, i);
        }

        if (this.products.length === 0) {
          this.notProducts = true;
        }
      }, err => {
        console.log('search=>', err);
      }
    );
  }

  getImageFromService(id: any , name: any, i: any) {
    this.isImageLoading = true;
    this.productsService.getImage(id, name).subscribe(
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


 seeProduct(idProduct) {
  //alert(idProduct);
  this.router.navigate(['mado/product/detail', idProduct]);
}

}
