import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/core/store.service';

@Component({
  selector: 'app-manage-dtail',
  templateUrl: './manage-dtail.component.html',
  styleUrls: ['./manage-dtail.component.css']
})
export class ManageDtailComponent implements OnInit {

  product_store: FormGroup;
  con_product: any;
  public idProduct: any;

  // ข้อมูลสินค้า
  name_pd: any;
  catagory_pd: any;
  condition_pd: any;
  detail_pd: any;
  panelColor: any;
  catagory_id: any;

  catagory_level1: any;
  catagory_level2: any;
  catagory_level3: any;
  level: any;
  expanded: any;
  store_name = [];
  select_category: any;
  data_edit: FormGroup;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private storeService: StoreService) {
    this.infoForm();
   }

  ngOnInit() {
    this.expanded = false;
    this.level = 0;
    this.idProduct = this.route.snapshot.paramMap.get('id');
    // alert(this.idProduct);
    this.con_product = ['NEW', 'SECONDHAND'];
    this.storeService.getproductbyID(this.idProduct).subscribe(
      res => {
        this.name_pd = res['body'].product[0].name_product;
        this.condition_pd = res['body'].product[0].condition;
        this.detail_pd = res['body'].product[0].description;
        this.catagory_pd = res['body'].product[0].catagory['name_category'];
        this.catagory_id =  res['body'].product[0].catagory['id_category'];
        this.infoForm();
        console.log('product=>', res);
      }, error => {
        console.log('err', error);
      }
    );

    this.storeService.getCatagory().subscribe(
      res => {
        console.log('catagoryall=>', res);
        this.catagory_level1 = res['body'];
      }, error => {
        console.log('error', error);
      }
    );

  }

  infoForm() {
    this.product_store = this.fb.group({
      name_product: [this.name_pd, Validators.required],
      catagory: [this.catagory_id, Validators.required],
      condition: [this.condition_pd, Validators.required],
      description: [this.detail_pd]
    });
  }

  onExpand() {
    if (this.expanded) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }

  }

  onSelect_category(index: any) {
    // alert('change data');
    this.store_name[0] = this.catagory_level1[index].name_catagory + '>';
    this.level = 1;
    this.catagory_level2 = this.catagory_level1[index].subcategories;
    this.expanded = true;
  }

  onSelect_category_level1(index: any) {

    if (this.catagory_level2[index].subcategories === undefined) {
      this.store_name[1] = this.catagory_level2[index].name_catagory;
      this.select_category = this.store_name[0] + this.store_name[1];
      this.catagory_pd = this.select_category;

      this.expanded = false;
      this.level = 0;
      this.product_store.value.catagory = this.catagory_level2[index].id_catagory;
    } else {
      this.store_name[1] = this.catagory_level2[index].name_catagory + '>';
      this.catagory_level3 = this.catagory_level2[index].subcategories;
      this.level = 2;
    }
  }

  onSelect_category_level2(index: any) {
    this.store_name[2] = this.catagory_level3[index].name_catagory ;
    this.select_category = this.store_name[0] + this.store_name[1] + this.store_name[2];
    this.catagory_pd = this.select_category;
    this.product_store.value.catagory = this.catagory_level3[index].id_catagory;
    this.expanded = false;
    this.level = 0;
  }

  onEdit_detail() {


    this.data_edit = this.fb.group({
      body: {
        id_product: this.idProduct,
        name_product: this.product_store.value.name_product,
        catagory: this.product_store.value.catagory,
        condition: this.product_store.value.condition,
        description: this.product_store.value.description
      }
    });
    console.log('dataProduct=>', this.data_edit.value);

    this.storeService.editofProduct(this.data_edit.value).subscribe(
      res => {
        alert('แก้ไขรายละเอียดสำเร็จ');
        console.log('resEdit=>', res);
        this.ngOnInit();
      }, error => {
        console.log('error', error);
      }
    )

    // this.storeService.editofProduct()
  }

}
