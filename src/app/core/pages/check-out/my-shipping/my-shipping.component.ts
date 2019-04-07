import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreService } from 'src/app/services/core/store.service';

@Component({
  selector: 'app-my-shipping',
  templateUrl: './my-shipping.component.html',
  styleUrls: ['./my-shipping.component.css']
})
export class MyShippingComponent implements OnInit {

  shipping_name: any;
  select_ship: any;

  shipping = [];
  id_product: any;
  send_status: any;

  constructor(public dialogRef: MatDialogRef<MyShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storeService: StoreService) { }

  ngOnInit() {
    this.send_status = false;
    this.shipping_name = this.data.name;
    // alert(this.shipping_name);
    this.storeService.get_shipping(this.data.id).subscribe(
      res => {
        console.log('res_shipping=> ', res['body']['product_delivery']);

        this.shipping = res['body']['product_delivery'];
       // this.get_minvalue();
        console.log('min_value=>', this.get_minvalue());
        this.select_ship  = this.get_minvalue();

      }, error => {
        console.log('error', error);
      }
    );

  }

  get_minvalue() {
   // console.log('length=>', this.shipping.length);
    // console.log('ship=>', this.shipping);
    let min = this.shipping[0];
    for (let i = 0; i < this.shipping.length; i++) {
      if (min < this.shipping[i]) {
        min = this.shipping[i];

        this.shipping_name = this.shipping[i].name_ship;

      }
    }

    return min;
  }

  on_selectShip(ind: any) {
    // console.log('ind=>', ind);
    this.select_ship = this.shipping[ind];
    this.send_status = true;
  }

  save() {
    // console.log('ship_set=>', this.select_ship);
    if (this.send_status === true) {
      this.dialogRef.close(this.select_ship);
    } else {
      this.on_canceled();

    }

  }

  on_canceled() {
    for (let i = 0; i < this.shipping.length; i++) {
        if (this.shipping_name === this.shipping[i].name_ship) {
          this.dialogRef.close(this.shipping[i]);
        }
      }
  }

}
