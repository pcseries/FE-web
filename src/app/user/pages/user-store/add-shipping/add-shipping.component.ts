import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.css']
})
export class AddShippingComponent implements OnInit {

  id_product: any;
  ship_check: any;
  check = [];

  add_shipping: FormGroup;
  add_shipping2: FormGroup;
  dis_button = [];

  allow_button: any;
  count_allow: any;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {

   }

  ngOnInit() {

    this.id_product = this.route.snapshot.paramMap.get('id');
    this.allow_button = true;
    this.dis_button[0] = true;
    this.dis_button[1] = true;
    this.check[0] = false;
    this.check[1] = false;
    this.ship_check = false;

  }

  on_selectvalue(num: any) {

    if (this.check[num] === false) {
      this.check[num] = true;

    } else if (this.check[num] === true) {
      this.check[num] = false;

    }

    this.count_allow = 0;
    for (let i = 0; i < this.dis_button.length; i++) {
      if (this.check[i] === true) {
        this.count_allow++;
      }
    }

    if (this.count_allow > 0 && this.count_allow <= 2) {
      this.allow_button = false;
    } else {
      this.allow_button = true;
    }
    console.log(this.check[num]);
  }

  submit_shipping(d1: HTMLInputElement, d2: HTMLInputElement, p1: HTMLInputElement, p2: HTMLInputElement) {
    console.log('day1', d1.value);
    console.log('price1', p1.value);
    console.log('day2', d2.value);
    console.log('price2', p2.value);

    for (let i = 0; i < this.count_allow; i++) {
      if (this.check[i] === true) {

        if (i === 0) {
          this.add_shipping = this.fb.group({
          body: {
            id_product: this.id_product,
            id_type: 1,
            price: parseInt(p1.value , 10) ,
            time_ship:  parseInt(d1.value , 10)
          }
        });
        this.ship_check = true;
        console.log('ship1', this.add_shipping.value);
        this.onSet_shipping(this.add_shipping.value);
        } else if (i === 1) {
          this.add_shipping2 = this.fb.group({
            body: {
              id_product: this.id_product,
              id_type: 2,
              price: p2.value,
              time_ship: d2.value
            }
          });
          this.ship_check = true;
          console.log('ship2', this.add_shipping2.value);
          this.onSet_shipping(this.add_shipping2.value);
        }

      }


    }

    if ( this.ship_check === true) {
      alert('บันทึกการจัดส่งสำเร็จ');
    }



  }


  onSet_shipping(data: any) {
    this.productsService.on_setShipping(data).subscribe(
      res => {
        console.log('res_ship=>', res);
      }, err => {
        console.log('err_ship=>', err);
      }
    );
  }
}
