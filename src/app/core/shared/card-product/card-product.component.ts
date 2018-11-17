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
  @Input() idProduct: any;

  constructor( private productService: ProductsService) { }

  ngOnInit() {

 this.productService.detailProduct(this.idProduct).subscribe(
      response => {
        this.nameProduct = response['body'].product[0].name_product;
        console.log('response', response);
      },
      error => {
        console.log('error' , error);
      }
    );
  }

}
