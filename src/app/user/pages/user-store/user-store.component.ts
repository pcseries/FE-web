import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Variation } from './variation.model';
import { StoreService } from 'src/app/services/core/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.css']
})
export class UserStoreComponent implements OnInit {
  productAdd: FormGroup;
  addProduct_status: boolean;
  con = [];
  forAddProduct: FormGroup;


  // ส่วน variation
  name_variation: any;
  variation: Variation[] = [];
  variation_1: FormGroup;


  // ส่วน status
  active_btnadd: boolean = false;

  // ตรวจสอบการ expand
  expanded: boolean = false;

  // catagory
  width_catagory: any;
  catagory_value: any;
  catagory_level1: any;
  length_level1: any;
  category_all = [];
  catagory_level2: any;
  catagory_level3: any;
  select_category: any;
  store_name = [];
  level: any;
  allow_add: any;


  id_catagory: any;
  edit_row: any;

  // ตัว upload รูปภาพ
  upload_image: any;
  id_toImage: any;
  product_image_dtail: any;
  on_openStore: any;

  on_loading: any;

  shop_status: any;
  clickOpen_shop: any;

  constructor(private fb: FormBuilder,
    private storeService: StoreService,
    private router: Router,

    ) {
    this.productAdd = this.fb.group({
          name_product: ['', Validators.required],
          catagory: ['', Validators.required],
          condition: ['', Validators.required],
          description: [''],
          product_variation: []
    });
    this.variation_1 = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required,  Validators.maxLength(6), Validators.pattern('[0-9]+[A-Z]?')]],
      stock: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]+[A-Z]?')]]
    }
    );
  }

  ngOnInit() {
    this.clickOpen_shop = false;
    this.open_orclose();
    this.on_loading = true;
    this.on_openStore = false;
    this.check_store();

    this.upload_image = false;
    this.addProduct_status = false;
    this.category_all.push(0);
    this.con = ['NEW', 'SECONDHAND'];
    console.log('catagory', this.productAdd.value.catagory);
    this.storeService.getCatagory().subscribe(
      res => {
        console.log('resCatagory', res['body']);
        this.catagory_level1 = res['body'];

        console.log('categoryAll', this.category_all);
      }, error => {
        console.log('error', error);
      }
    );
    this.select_category = 'เลือกหมวดหมู่';
    this.level = 0;

    this.edit_row = -1;
    this.allow_add = false;
  }

  open_orclose() {
    this.storeService.getDetail_shop().subscribe(
      res => {
        console.log('res_store=>', res['body'][0].status);
        this.shop_status = res['body'][0].status;

        if (this.shop_status === 'CLOSE') {
          this.clickOpen_shop = true;
        }
      }, error => {
        console.log('err', error);
      }
    );
  }

  check_store() {
    this.storeService.storeCheck().subscribe(
      res => {
        let status = res['status'];

        console.log('statusStore', res);
        if (status === 401) {
          console.log('statusStore', status);
          this.on_loading= false;
        } else {
          this.on_openStore = true;
          this.on_loading= false;
        }
      },
      err => {
        console.log('errStatus', err);
      }
    );
  }

  onAddProduct() {
    this.addProduct_status = true;
  }

  // onAdd_variation(name: HTMLInputElement , price: HTMLInputElement, amount: HTMLInputElement) {
  //  // alert('onvariation');
  //    this.variation.push(new Variation(name.value, parseInt(price.value, 10), parseInt(amount.value, 10)));
  //    this.productAdd.value.product_variation = this.variation;
  //   console.log('variation', this.variation);
  //   console.log('addVariation=>', this.productAdd.value.product_variation);
  //   console.log('name', name.value);
  //   name.value = null;
  //   price.value = null;
  //   amount.value = null;
  // }

  onAdd_variation(name: HTMLInputElement , price: HTMLInputElement, stock: HTMLInputElement
    ) {
    if (name.value === '') {
      alert('กรุณากรอกชื่อ ตัวเลือกสินค้า');
    } else if (price.value === '') {
      alert('กรุณากรอกราคา ตัวเลือกสินค้า');
    } else if (stock.value === '') {
      alert('กรุณากรอกจำนวน ตัวเลือกสินค้า');
    } else {

        console.log(this.variation_1.value);
      this.variation.push(new Variation(this.variation_1.value.name, parseInt(this.variation_1.value.price, 10),
      parseInt(this.variation_1.value.stock, 10)));

        name.value = null;
        price.value = null;
        stock.value = null;

        this.allow_add = true;
    }
  }

  onRemove_variation(index: any) {
    // alert(index);
    let c = confirm('Are you sure delete');

    if (c == true) {
      this.variation.splice(index, 1);
    }

  }

  onsubmit_product() {

    this.productAdd.value.product_variation = this.variation;
    this.productAdd.value.catagory = this.id_catagory;
    this.forAddProduct = this.fb.group({
      body: {
        name_product: this.productAdd.value.name_product,
        catagory: this.productAdd.value.catagory,
        condition: this.productAdd.value.condition,
        description: this.productAdd.value.description,
        product_variation: this.variation
      }
    });
    console.log('data-productAdd: ', this.forAddProduct.value);
    this.storeService.addProduct(this.forAddProduct.value).subscribe(
      resOnsubmit => {
        this.product_image_dtail = resOnsubmit;
        console.log('onAddProduct', resOnsubmit );
        alert('เพิ่มสินค้าสำเร็จ');
        this.id_toImage = this.product_image_dtail.id_product;
        // this.addProduct_status = false;
        this.router.navigate(['/user/addImage', this.id_toImage]);
      },
      error => {
        console.log('errorAddProduct', error);
      }
    );

  }

  onNotadd_product() {
    this.addProduct_status = false;
  }

  onExpand() {
    if (this.expanded) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }

  }

  onSelect_category(index: any) {

    this.store_name[0] = this.catagory_level1[index].name_catagory + '>';
    console.log('list_name', this.store_name);
    console.log('subCategory', this.catagory_level1[index].subcategories);
    this.catagory_level2 = this.catagory_level1[index].subcategories;
    if (this.category_all.length < 2) {
      this.category_all.push(1);
    }
    this.level = 1;
  }

  onSelect_category_level3(index: any ) {

    if ( this.catagory_level2[index].subcategories === undefined) {
      this.store_name[1] = this.catagory_level2[index].name_catagory;
      this.select_category = this.store_name[0] + this.store_name[1];
      this.expanded = false;
      this.level = 0;
     // console.log('category=>', this.catagory_level2[index]);
      this.onset_catagoryId(this.catagory_level2[index].id_catagory);
    } else {
      this.store_name[1] = this.catagory_level2[index].name_catagory + '>';


      console.log('list_name', this.store_name);
      console.log('category_level3', this.catagory_level2[index].subcategories);
      this.catagory_level3 = this.catagory_level2[index].subcategories;
      if (this.category_all.length < 3) {
        this.category_all.push(2);
      }
      this.level = 2;
    }
  }

  onSelect_category_level4(index: any) {
    this.store_name[2] = this.catagory_level3[index].name_catagory ;
    this.select_category = this.store_name[0] + this.store_name[1] + this.store_name[2];
    console.log('category_level3', this.catagory_level3[index]);
    this.productAdd.value.catagory = this.catagory_level3[index].id_catagory;

    this.onset_catagoryId(this.catagory_level3[index].id_catagory);
    // เอา id_catagory
    this.category_all.splice(2 , 1);
    this.category_all.splice(1, 1);
    this.expanded = false;
    this.level = 0;
  }

  onset_catagoryId(idCatagory: any) {
    // set id catagory
    this.id_catagory = idCatagory;
  }

  onEdit_variation(index: any) {


    this.edit_row = index;
  }

  onConfirm_edit(index: any, name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {
    this.variation[index].name = name.value;
    this.variation[index].price = price.value;
    this.variation[index].stock = stock.value;
    console.log('variation', this.variation[index]);


    this.edit_row = -1;
  }

  goEdit_store() {
    this.router.navigate(['/user/store/edit']);
  }


  open_again() {
    // alert('open again');
    this.storeService.openStore_again().subscribe(
      res => {
        console.log('res_openstoreagein', res);
        alert('เปิดร้านค้าสำเร็จ');
        this.ngOnInit();
      }, err => {
        console.log('err', err);
      }
    );
  }


}
