import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/core/store.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { store } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-store-manage-variation',
  templateUrl: './store-manage-variation.component.html',
  styleUrls: ['./store-manage-variation.component.css']
})
export class StoreManageVariationComponent implements OnInit {

  public idProduct: any;

  variation_product = [];
  data_edit: FormGroup;
  variation_add: FormGroup;
  form_variation: FormGroup;
  delete_variation: FormGroup;


  onedit: any;

  constructor(private route: ActivatedRoute ,
    private storeService: StoreService,
    private fb: FormBuilder,
    private router: Router) {
      this.form_variation = this.fb.group({
        name: [''],
        price: [''],
        stock: ['']
      });
    }

  ngOnInit() {
    this.onedit = -1;
    this.idProduct = this.route.snapshot.paramMap.get('id');
   // alert(this.idProduct);

   this.storeService.getproductbyID(this.idProduct).subscribe(
    resProduct => {
      console.log('productByid2=> ', resProduct);
      this.variation_product = resProduct['body']['product'][0]['product_variation'];
    }, error => {
      console.log('error', error);
    }
  );



  }

  onEditRow(i: any) {
    this.onedit = i;
  }

  edit_variation(name: HTMLInputElement, price: HTMLInputElement , stock: HTMLInputElement,
    id_variation: any) {
    this.onedit  = -1;
    this.data_edit = this.fb.group({
      body: {
        id_product: this.idProduct,
        product_variation: [{
          id_variation: id_variation,
          name: name.value,
          price: price.value,
          stock: stock.value
        }]
      }
    });

    this.storeService.editofProduct(this.data_edit.value).subscribe(
      res => {

        console.log('editProduct=> ', res);
        alert('แก้ไขตัวเลือกสำเร็จ');
        this.ngOnInit();
      }, error => {
        console.log('editerror', error);
      }
    );


  }


  oncreate_variation(name: HTMLInputElement, price: HTMLInputElement, amount: HTMLInputElement) {


    this.variation_add = this.fb.group({
      body: {
        id_product: this.idProduct,
        product_variation: [{
          name: this.form_variation.value.name,
          price: parseInt(this.form_variation.value.price, 10),
          stock: parseInt(this.form_variation.value.stock, 10)
        }]
      }
    });
    console.log('data_create=>', this.variation_add.value);

    this.storeService.editofProduct(this.variation_add.value).subscribe(
      res => {
        alert('เพิ่มตัวเลือกสินค้าสำเร็จ');
        console.log('res_create=>', res);

        name.value = null;
        price.value = null;
        amount.value = null;
        this.ngOnInit();
      }, error => {
        console.log('err_create=>', error);
      }
    );


  }

  onRemove_variation(ind: any) {
    // alert('remove_variation');
    let c = confirm('Are you sure delete');

    // ทำตัว confirm ด้วย
    // console.log('delete_variation=> ', this.variation_product[ind]);
    if (c == true) {
      this.delete_variation = this.fb.group({
        body: {
          id_variation: [this.variation_product[ind].id_variation]
        }
      });
      console.log('delete_variation=> ', this.delete_variation.value);
      this.storeService.deleteVariation(this.delete_variation.value).subscribe(
        res => {
          console.log('de_variation=>', res);
          this.ngOnInit();
        },
        err => {
          console.log('err_delete_variation', err);
        }
      );
    }
  }

}
