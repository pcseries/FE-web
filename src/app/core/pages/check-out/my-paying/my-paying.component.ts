import { Component, OnInit, Inject } from '@angular/core';
import { ProductsComponent } from 'src/app/core/shared/allProduct/products/products.component';
import { ProductsService } from 'src/app/services/core/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyShippingComponent } from '../my-shipping/my-shipping.component';

@Component({
  selector: 'app-my-paying',
  templateUrl: './my-paying.component.html',
  styleUrls: ['./my-paying.component.css']
})
export class MyPayingComponent implements OnInit {

  payment_order: any;

  present_pay: any;
  select_type: any;
  send_status: any;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<MyPayingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.send_status = false;
    this.present_pay = this.data.name;
    // alert(this.present_pay);
    this.get_payingOrder();
  }

  get_payingOrder() {
    this.productsService.get_paying().subscribe(
      res => {
         console.log('Paying_all=>', res['body']);
        this.payment_order = res['body'];
        this.select_type = this.payment_order[0].name_type;
      }, error => {
        console.log('err_pay=>', error);
      }
    );
  }

  on_selectPay(ind: any) {
    // alert(this.payment_order[ind].name_type);
    this.select_type = this.payment_order[ind].name_type;
    this.send_status = true;
  }

  save() {
   // console.log('selectType=>', this.payment_order );

    if (this.send_status === true) {
      this.dialogRef.close(this.select_type);
    } else {
      this.on_cancel();
    }
  }

  on_cancel() {
    for (let i = 0; i < this.payment_order.length; i++) {
      if (this.present_pay === this.payment_order[i].name_type) {
        this.dialogRef.close(this.payment_order[i].name_type);
      }

    }
  }
}
