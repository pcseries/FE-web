import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pay-products',
  templateUrl: './pay-products.component.html',
  styleUrls: ['./pay-products.component.css']
})
export class PayProductsComponent implements OnInit {

  id_order: any;
  amount_order: any;

  data_pay: FormGroup;

  imageToShow: any;
  status: any;

  refreshInterval: any;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.id_order = this.route.snapshot.paramMap.get('id');
   // alert(this.id_order);
    this.amount_order = localStorage.getItem('amount');
   // alert(this.amount_order);

    this.pay_order();
  }

  pay_order() {
    this.data_pay = this.fb.group({
      id_order: this.id_order,
      amount: this.amount_order
    });

    console.log('pay_data=>', this.data_pay.value);

    this.productsService.pay_product(this.data_pay.value).subscribe(
      data => {
        this.createImageFromBlob(data);
      }, error => {
        console.log('error_pay=>', error);
      }
    );

    this.onget_status();
  }

  onget_status() {

     this.refreshInterval = setInterval(() => {
    this.on_status();
    } , 5000);
  }

  on_status() {

    this.productsService.ongetorder_byid(this.id_order).subscribe(
      res => {
        console.log('res_status=>', res['body']['order'][0].order_item[0].order_item_status);
        this.status = res['body']['order'][0].order_item[0].order_item_status;
        if (this.status === 'NOT_SHIP') {
          alert('จ่ายสินค้าสำเร็จ');
          this.router.navigate(['/user/payHistory/1']);
          clearInterval(this.refreshInterval);
        }
      }, error => {
        console.log('err=>', error);
      }
    );
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

 go_historypay() {

    this.router.navigate(['/user/payHistory/0']);
 }

}
