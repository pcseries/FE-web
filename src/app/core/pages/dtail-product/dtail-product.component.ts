import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-dtail-product',
  templateUrl: './dtail-product.component.html',
  styleUrls: ['./dtail-product.component.css'],
  providers: [ProductsService]
})
export class DtailProductComponent implements OnInit {

  public idProduct: any;

  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit() {
     this.idProduct = this.route.snapshot.paramMap.get('id');

     this.productService.detailProduct(this.idProduct).subscribe(
       response => {
         console.log('response_dtail', response);
       },
       error => {
         console.log('error' , error);
       }
     );
  }

}
